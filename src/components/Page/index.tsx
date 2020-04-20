import 'material-design-icons/iconfont/material-icons.css';
import React, { PureComponent } from 'react';
import { ThemeProvider } from 'styled-components';
import Player from '../../model/Player';
import PlayerHandler from '../../rest/PlayerHandler';
import DarkTheme from '../../themes/DarkTheme';
import GlobalStyle from '../../themes/GlobalStyle';
import LightTheme from '../../themes/LightTheme';
import Board from '../Board';
import Field from '../Board/Field';
import Dialog from '../Dialog';
import DialogButton from '../Dialog/Button';
import Loader from '../Dialog/Loader';
import TextField from '../Dialog/TextField';
import Title from '../Dialog/Title';
import Toolbar from '../Toolbar';
import IconButton from '../Toolbar/IconButton';
import State from './State';

export default class extends PureComponent<{}, State> {
  _playerHandler: PlayerHandler;
  _moves: number;

  constructor(props: {}) {
    super(props);

    this._playerHandler = new PlayerHandler(this._displayMessage);
    this._moves = 0;
    this.state = this._initialState;
  }

  render() {
    const { players, fields, textFields, loaderVisible, userDialogVisible, message, messageDialogVisible, darkMode } = this.state;
    const name = players.map(item => item.name);
    const points = players.map(item => item.points);

    return (
      <ThemeProvider theme={darkMode ? DarkTheme : LightTheme}>
        <GlobalStyle />
        <Toolbar title='TicTacToe' score={`${name[Player.X]} ${points[Player.X]}:${points[Player.O]} ${name[Player.O]}`}>
          <IconButton icon='settings_brightness' onClick={this._switchTheme} />
          <IconButton icon='delete' onClick={this._deleteData} />
        </Toolbar>
        <Board>{fields.map(({ content, onClick }, index) => <Field key={index} content={content} onClick={onClick} />)}</Board>
        {
          userDialogVisible &&
          <Dialog>
            <>{textFields.map(({ label, placeholder, value, isValid, onChange }, index) => <TextField key={index} label={label} placeholder={placeholder} value={value} isValid={isValid} onChange={onChange} />)}</>
            <DialogButton text='save' onClick={this._savePlayers} />
          </Dialog>
        }
        {
          messageDialogVisible &&
          <Dialog>
            <Title text={message} />
            <DialogButton text='restart' onClick={this._restart} />
          </Dialog>
        }
        {
          loaderVisible &&
          <Dialog>
            <Loader />
          </Dialog>
        }
      </ThemeProvider>
    );
  }

  componentDidMount() {
    /* This function has to be called here because it calls setState() which would have no effect in the constructor. */
    this._verifyPlayers();
  }

  _verifyPlayers(id: number = 0, players: Player[] = []) {
    this._playerHandler
      .loadPlayer(id)
      .then((player) => {
        if (player === null) {
          this.setState({
            loaderVisible: false,
            userDialogVisible: !this.state.messageDialogVisible && true
          });
        } else {
          id++;
          players.push(player);

          if (id === this.state.players.length) {
            this.setState({
              players,
              loaderVisible: false
            });
          } else {
            this._verifyPlayers(id, players);
          }
        }
      });
  }

  _savePlayers = () => {
    const textFields = [...this.state.textFields];
    let noEmptyTextFields = true;

    for (let item of textFields) {
      if (this._isEmpty(item.value)) {
        item.isValid = false;
        noEmptyTextFields = false;
      } else {
        item.isValid = true;
      }
    }

    if (noEmptyTextFields) {
      const players = Array();

      textFields.forEach(({ value: name }, index) => {
        const player = new Player(name);

        players.push(player);
        this._playerHandler.savePlayer(index, player)
      });

      this.setState({
        players,
        userDialogVisible: false
      });
    } else {
      this.setState({ textFields });
    }
  }

  _selectField(index: number) {
    const COMBINATIONS_TO_WIN_THE_GAME = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    const currentPlayer = this._moves % this.state.players.length;
    const fields = [...this.state.fields];

    if (!this._isEmpty(fields[index].content)) {
      return;
    }

    fields[index].content = (currentPlayer === Player.X ? 'X' : 'O');
    this.setState({ fields });

    for (const combination of COMBINATIONS_TO_WIN_THE_GAME) {
      const field = (index: number) => fields[combination[index]].content;
      const fieldsAreEqual = (index1: number, index2: number) => field(index1) === field(index2);

      if (!this._isEmpty(field(0)) && fieldsAreEqual(0, 1) && fieldsAreEqual(1, 2)) {
        this._displayWinner(currentPlayer);
        return;
      }
    }

    if (this._checkIfDraw(fields)) {
      this._displayMessage('Unentschieden!');
      return;
    }

    this._moves++;
  }

  _displayWinner(id: number) {
    const players = [...this.state.players];
    players[id].points++;

    this._playerHandler.savePlayer(id, players[id]);
    this.setState({ players });

    this._displayMessage(players[id].name + ' hat gewonnen!');
  }

  _displayMessage = (message: string) => {
    this.setState({
      message,
      messageDialogVisible: true,
      loaderVisible: false,
      userDialogVisible: false
    });
  }

  _switchTheme = () => {
    this.setState({
      darkMode: !this.state.darkMode
    });
  }

  _checkIfDraw(fields: State['fields']): boolean {
    for (const { content } of fields) {
      if (this._isEmpty(content)) {
        return false;
      }
    }

    return true;
  }

  _deleteData = (): void => {
    this._restart();

    for (let index = 0, max = this.state.players.length; index < max; index++) {
      this._playerHandler.deletePlayer(index);
    }
  }

  _isEmpty(item: string): boolean {
    return item.trim() === '';
  }

  _onChange(index: number, event: React.ChangeEvent<HTMLInputElement>): void {
    const textFields = [...this.state.textFields];
    textFields[index].value = event.target.value;

    this.setState({ textFields });
  }

  _restart = (): void => {
    this._moves = 0;

    this.setState(this._initialState);
    this._verifyPlayers();
  }

  get _initialState(): State {
    const PLAYERS = ['X', 'O'];
    const FIELD_COUNT = 9;

    const players = PLAYERS.map(name => new Player(name));
    const fields = Array(FIELD_COUNT);

    for (let index = 0; index < FIELD_COUNT; index++) {
      fields[index] = {
        content: '',
        onClick: this._selectField.bind(this, index)
      }
    }

    const textFields = PLAYERS.map((name, index) => ({
      label: 'Spieler ' + name,
      placeholder: 'Name',
      value: '',
      isValid: true,
      onChange: this._onChange.bind(this, index)
    }));

    return {
      players,
      fields,
      textFields,
      loaderVisible: true,
      userDialogVisible: false,
      message: '',
      messageDialogVisible: false,
      darkMode: (this.state != undefined ? this.state.darkMode : false)
    }
  };
}
