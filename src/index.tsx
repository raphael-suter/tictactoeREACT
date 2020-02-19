import 'material-design-icons/iconfont/material-icons.css';
import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import Board from './components/Board';
import Field from './components/Board/Field';
import Dialog from './components/Dialog';
import Button from './components/Dialog/Button';
import TextField from './components/Dialog/TextField';
import Title from './components/Dialog/Title';
import Toolbar from './components/Toolbar';
import './index.scss';
import Player from './Player';
import PlayerHandler from './PlayerHandler';
import State from './State';

class App extends PureComponent<{}, State> {
    private clicks: number;
    private playerHandler: PlayerHandler;

    constructor(props: {}) {
        super(props);

        this.clicks = 0;
        this.playerHandler = new PlayerHandler();
        this.state = this.initialState;
    }

    render() {
        const { players, fields, textFields, userDialogVisible, message, messageDialogVisible } = this.state;
        const name = players.map(item => item.name);
        const points = players.map(item => item.points);

        return (
            <>
                <Toolbar title='TicTacToe' score={`${name[Player.X]} ${points[Player.X]}:${points[Player.O]} ${name[Player.O]}`} buttonIcon='delete' buttonOnClick={this.deleteData} />
                <Board>{fields.map(({ content, onClick }, index) => <Field key={index} content={content} onClick={onClick} />)}</Board>
                <Dialog visible={userDialogVisible}>
                    <>{textFields.map(({ label, placeholder, value, isValid, onChange }, index) => <TextField key={index} label={label} placeholder={placeholder} value={value} isValid={isValid} onChange={onChange} />)}</>
                    <Button text='save' onClick={this.savePlayers} />
                </Dialog>
                <Dialog visible={messageDialogVisible}>
                    <Title text={message} />
                    <Button text='restart' onClick={this.restart} />
                </Dialog>
            </>
        );
    }

    componentDidMount() {
        /* This function has to be called here because it calles setState() which would have no effect in the constructor. */
        this.verifyPLayers();
    }

    verifyPLayers() {
        for (let i = 0; i < this.state.players.length; i++) {
            if (this.playerHandler.load(i) === null) {
                return;
            }
        }

        this.displayPlayers();
    }

    savePlayers = () => {
        const textFields = [...this.state.textFields];
        let noEmptyTextFields = true;

        for (let item of textFields) {
            if (this.isEmpty(item.value)) {
                item.isValid = false;
                noEmptyTextFields = false;
            } else {
                item.isValid = true;
            }
        }

        if (!noEmptyTextFields) {
            this.setState({
                textFields
            });

            return;
        }

        textFields.forEach(({ value }, index) => this.playerHandler.save(index, new Player(value)));
        this.displayPlayers();
    }

    selectField(index: number) {
        const COMBINATIONS_TO_WIN_THE_GAME = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
        const currentPlayer = this.clicks % this.state.players.length;
        const fields = [...this.state.fields];

        if (!this.isEmpty(fields[index].content)) {
            return;
        } else {
            fields[index].content = (currentPlayer === Player.X ? 'X' : 'O');

            this.setState({
                fields
            });
        }

        for (const item of COMBINATIONS_TO_WIN_THE_GAME) {
            const field = (index: number) => fields[item[index]].content;
            const fieldsAreEqual = (index1: number, index2: number) => field(index1) === field(index2);

            if (!this.isEmpty(field(0)) && fieldsAreEqual(0, 1) && fieldsAreEqual(1, 2)) {
                this.displayWinner(currentPlayer);
                return;
            }
        }

        if (this.checkIfDraw(fields)) {
            this.displayMessage('Unentschieden!');
            return;
        }

        this.clicks++;
    }

    displayWinner(id: number) {
        const player = this.playerHandler.load(id);

        player.points++;
        this.playerHandler.save(id, player);

        this.displayMessage(player.name + ' hat gewonnen!');
        this.displayPlayers();
    }

    displayMessage(message: string) {
        this.setState({
            message,
            messageDialogVisible: true
        });
    }

    displayPlayers() {
        this.setState({
            players: Array(this.state.players.length).fill('').map(({ }, index) => this.playerHandler.load(index)),
            userDialogVisible: false
        });
    }

    checkIfDraw(fields: State['fields']): boolean {
        for (const item of fields) {
            if (this.isEmpty(item.content)) {
                return false;
            }
        }

        return true;
    }

    deleteData = () => {
        for (let i = 0; i < this.state.players.length; i++) {
            this.playerHandler.delete(i);
        }

        this.restart();
    }

    isEmpty(item: string): boolean {
        return item.trim() === '';
    }

    onChange(index: number, event: React.ChangeEvent<HTMLInputElement>) {
        const textFields = [...this.state.textFields];
        textFields[index].value = event.target.value;

        this.setState({
            textFields
        });
    }

    restart = () => {
        this.setState(this.initialState);
        this.verifyPLayers();

        this.clicks = 0;
    }

    get initialState(): State {
        const PLAYERS = ['X', 'O'];

        return {
            players: PLAYERS.map(item => new Player(item)),
            fields: Array(9).fill('').map(({ }, index) => ({
                content: '',
                onClick: this.selectField.bind(this, index)
            })),
            textFields: PLAYERS.map((item, index) => ({
                label: 'Spieler ' + item,
                placeholder: 'Name',
                value: '',
                isValid: true,
                onChange: this.onChange.bind(this, index)
            })),
            userDialogVisible: true,
            message: '',
            messageDialogVisible: false
        }
    };
}

ReactDOM.render(<App />, document.getElementById("root"))
