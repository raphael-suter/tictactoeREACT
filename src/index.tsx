import 'material-design-icons/iconfont/material-icons.css';
import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import Board, { Field } from './components/Board';
import Dialog, { Button, TextField } from './components/Dialog';
import { Title } from './components/Dialog/Title';
import Toolbar from './components/Toolbar';
import './index.scss';
import Player from './scripts/Player';
import PlayerHandler, { PLAYER } from './scripts/PlayerHandler';

interface State {
    player_x: Player;
    player_o: Player;
    fields: string[];
    userDialogVisible: boolean;
    message: string;
    messageDialogVisible: boolean;
}

const initialState: State = {
    player_x: new Player('X'),
    player_o: new Player('O'),
    fields: Array(9).fill(''),
    userDialogVisible: true,
    message: '',
    messageDialogVisible: false
}

class App extends PureComponent<{}, State> {
    private clicks: number;
    private playerHandler: PlayerHandler;
    private playerX_TextField: React.RefObject<HTMLInputElement>;
    private playerO_TextField: React.RefObject<HTMLInputElement>;

    constructor(props: {}) {
        super(props);

        this.clicks = 0;
        this.playerHandler = new PlayerHandler();
        this.playerX_TextField = React.createRef();
        this.playerO_TextField = React.createRef();
        this.state = initialState;
    }

    render() {
        const { player_x, player_o, fields, userDialogVisible, message, messageDialogVisible } = this.state;

        return (
            <>
                <Toolbar title='TicTacToe' score={player_x.name + ' ' + player_x.points + ':' + player_o.points + ' ' + player_o.name} buttonIcon='delete' buttonOnClick={() => this.deleteData()} />
                <Board>
                    {fields.map((item, index) => <Field content={item} key={index} onClick={() => this.selectField(index)} />)}
                </Board>
                <Dialog visible={userDialogVisible}>
                    <TextField label='Player X' placeholder='Name' reference={this.playerX_TextField} />
                    <TextField label='Player O' placeholder='Name' reference={this.playerO_TextField} />
                    <Button text='save' onClick={() => this.savePlayers()} />
                </Dialog>
                <Dialog visible={messageDialogVisible}>
                    <Title text={message} />
                    <Button text='restart' onClick={() => this.restart()} />
                </Dialog>
            </>
        );
    }

    componentDidMount() {
        if (this.playerHandler.load(PLAYER.PLAYER_X) !== null && this.playerHandler.load(PLAYER.PLAYER_O) !== null) {
            this.displayPlayers();
        }
    }

    savePlayers() {
        let countEmptyFields = 0;

        countEmptyFields += this.textFieldIsEmpty(this.playerX_TextField.current);
        countEmptyFields += this.textFieldIsEmpty(this.playerO_TextField.current);

        if (countEmptyFields > 0) {
            return;
        }

        this.playerHandler.save(PLAYER.PLAYER_X, new Player(this.playerX_TextField.current.value));
        this.playerHandler.save(PLAYER.PLAYER_O, new Player(this.playerO_TextField.current.value));

        this.displayPlayers();
    }

    displayPlayers() {
        this.setState({
            player_x: this.playerHandler.load(PLAYER.PLAYER_X),
            player_o: this.playerHandler.load(PLAYER.PLAYER_O),
            userDialogVisible: false
        });
    }

    selectField(index: number) {
        const fields = this.state.fields.slice();
        let currentPlayer: PLAYER;

        if (!this.isEmpty(fields[index])) {
            return;
        }

        if (this.clicks % 2 === 0) {
            fields[index] = 'X';
            currentPlayer = PLAYER.PLAYER_X;
        } else {
            fields[index] = 'O';
            currentPlayer = PLAYER.PLAYER_O;
        }

        this.setState({
            fields
        });

        for (const item of [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]) {
            if (!this.isEmpty(fields[item[0]]) && fields[item[0]] === fields[item[1]] && fields[item[1]] === fields[item[2]]) {
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

    displayWinner(playerKey: PLAYER) {
        const player = this.playerHandler.load(playerKey);

        player.points++;
        this.playerHandler.save(playerKey, player);

        this.displayMessage(player.name + ' hat gewonnen!');
        this.displayPlayers();
    }

    displayMessage(text: string) {
        this.setState({
            message: text,
            messageDialogVisible: true
        });
    }

    checkIfDraw(fields: string[]): boolean {
        let noEmptyFields = true;

        fields.forEach((item: string) => {
            if (this.isEmpty(item)) {
                noEmptyFields = false;
            }
        });

        return noEmptyFields;
    }

    deleteData() {
        Object.values(PLAYER).forEach((key: PLAYER) => {
            this.playerHandler.delete(key);
        });

        this.restart();
    }

    isEmpty(item: string): boolean {
        return item.trim() === '';
    }

    textFieldIsEmpty(textField: HTMLInputElement): number {
        if (this.isEmpty(textField.value)) {
            textField.classList.add('empty');
            return 1;
        } else {
            textField.classList.remove('empty');
            return 0;
        }
    }

    restart() {
        this.clicks = 0;
        this.setState(initialState);
        this.componentDidMount();
    }
}

ReactDOM.render(<App />, document.getElementById("root"))
