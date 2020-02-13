import 'material-design-icons/iconfont/material-icons.css';
import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import Board, { Field } from './components/Board';
import Dialog, { Button, TextField } from './components/Dialog';
import { Title } from './components/Dialog/Title';
import Toolbar from './components/Toolbar';
import './index.scss';

const COMBINATIONS: number[][] = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

enum COOKIES {
    PLAYER_X = 'player_x',
    POINTS_X = 'points_x',
    PLAYER_O = 'player_o',
    POINTS_O = 'points_o'
}

interface State {
    playerX: string;
    pointsX: number;
    playerY: string;
    pointsY: number;
    fields: string[];
    userDialogVisible: boolean;
    message: string;
    messageDialogVisible: boolean;
}

class App extends PureComponent<{}, State> {
    private clicks: number;
    private playerX_TextField: React.RefObject<HTMLInputElement>;
    private playerO_TextField: React.RefObject<HTMLInputElement>;

    constructor(props: {}) {
        super(props);

        this.clicks = 0;
        this.playerX_TextField = React.createRef();
        this.playerO_TextField = React.createRef();

        this.state = {
            playerX: 'X',
            pointsX: 0,
            playerY: 'O',
            pointsY: 0,
            fields: Array(9).fill(''),
            userDialogVisible: false,
            message: '',
            messageDialogVisible: false
        }
    }

    render() {
        const { playerX, pointsX, playerY, pointsY, fields, userDialogVisible, message, messageDialogVisible } = this.state;

        return (
            <>
                <Toolbar title='TicTacToe' score={playerX + ' ' + pointsX + ':' + pointsY + ' ' + playerY} buttonIcon='delete' buttonOnClick={() => this.reset()} />
                <Board>
                    {fields.map((item, index) => <Field content={item} key={index} onClick={() => this.selectField(index)} />)}
                </Board>
                <Dialog visible={userDialogVisible}>
                    <TextField label='Player X' placeholder='Name' reference={this.playerX_TextField} />
                    <TextField label='Player O' placeholder='Name' reference={this.playerO_TextField} />
                    <Button text='save' onClick={() => this.saveUserData()} />
                </Dialog>
                <Dialog visible={messageDialogVisible}>
                    <Title text={message} />
                    <Button text='restart' onClick={() => window.location.reload()} />
                </Dialog>
            </>
        );
    }

    componentDidMount() {
        if (this.checkCookies()) {
            this.displayScore();
        } else {
            this.showUserDialog();
        }
    }

    showUserDialog() {
        this.setState({
            userDialogVisible: true
        });
    }

    saveUserData() {
        let countEmptyFields = 0;

        countEmptyFields += this.textFieldIsEmpty(this.playerX_TextField.current);
        countEmptyFields += this.textFieldIsEmpty(this.playerO_TextField.current);

        if (countEmptyFields > 0) {
            return;
        }

        this.setCookie(COOKIES.PLAYER_X, this.playerX_TextField.current.value);
        this.setCookie(COOKIES.POINTS_X, '0');
        this.setCookie(COOKIES.PLAYER_O, this.playerO_TextField.current.value);
        this.setCookie(COOKIES.POINTS_O, '0');

        this.setState({
            userDialogVisible: false
        });

        this.displayScore();
    }

    selectField(index: number) {
        let fields = this.state.fields.slice();

        if (!this.isEmpty(fields[index])) {
            return;
        }

        if (this.clicks % 2 === 0) {
            fields[index] = 'X';
        } else {
            fields[index] = 'O';
        }

        this.setState({
            fields
        });

        for (const item of COMBINATIONS) {
            if (!this.isEmpty(fields[item[0]]) && fields[item[0]] === fields[item[1]] && fields[item[1]] === fields[item[2]]) {
                if (this.clicks % 2 === 0) {
                    this.incrementCookieValue(COOKIES.POINTS_X);
                    this.displayWinner(COOKIES.PLAYER_X);
                } else {
                    this.incrementCookieValue(COOKIES.POINTS_O);
                    this.displayWinner(COOKIES.PLAYER_O);
                }

                this.displayScore();
                return;
            }
        }

        if (this.checkIfEven(fields)) {
            this.displayMessage('Unentschieden!');
        }

        this.clicks++;
    }

    displayScore() {
        this.setState({
            playerX: this.getCookie(COOKIES.PLAYER_X),
            pointsX: Number.parseInt(this.getCookie(COOKIES.POINTS_X)),
            playerY: this.getCookie(COOKIES.PLAYER_O),
            pointsY: Number.parseInt(this.getCookie(COOKIES.POINTS_O))
        });
    }

    displayWinner(key: COOKIES) {
        this.displayMessage(this.getCookie(key) + ' hat gewonnen!');
    }

    displayMessage(text: string) {
        this.setState({
            message: text,
            messageDialogVisible: true
        });
    }

    checkCookies(): boolean {
        let cookiesAreValid = true;

        Object.values(COOKIES).forEach(key => {
            if (this.isEmpty(this.getCookie(key))) {
                cookiesAreValid = false;
            }
        });

        return cookiesAreValid
    }

    checkIfEven(fields: string[]): boolean {
        let noEmptyFields = true;

        fields.forEach((item: string) => {
            if (this.isEmpty(item)) {
                noEmptyFields = false;
            }
        });

        return noEmptyFields;
    }

    reset() {
        Object.values(COOKIES).forEach((key: COOKIES) => {
            this.deleteCookie(key);
        });

        window.location.reload();
    }

    setCookie(key: COOKIES, value: string) {
        document.cookie = key + '=' + value;
    }

    getCookie(key: COOKIES): string {
        const cookies = document.cookie.split('; ');
        return cookies.filter((item: string) => {
            const cookieKey = item.substr(0, 8);

            if (cookieKey === key) {
                return item;
            }
        }
        ).toString().substr(9);
    }

    deleteCookie(key: COOKIES) {
        document.cookie = key + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    }

    incrementCookieValue(key: COOKIES) {
        this.setCookie(key, (parseInt(this.getCookie(key)) + 1).toString());
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
}

ReactDOM.render(<App />, document.getElementById("root"))
