import { shallow } from 'enzyme';
import JestMockPromise from 'jest-mock-promise';
import React from 'react';
import Page from '.';
import Player from '../../model/Player';
import PlayerHandler from '../../rest/PlayerHandler';
import DarkTheme from '../../themes/DarkTheme';
import LightTheme from '../../themes/LightTheme';

const setup = (changes = {}) => {
  const wrapper = shallow<Page>(<Page />);
  wrapper.setState(changes);

  return wrapper;
}

describe('Page', () => {
  test('Renders without crashing.', () => {
    const wrapper = setup();
    expect(wrapper).toHaveLength(1);
  });

  test('Uses LightTheme as default theme.', () => {
    const wrapper: any = setup();
    const theme = wrapper.props().theme;

    expect(theme).toBe(LightTheme);
  });

  test('Is abel to switch to DarkTheme.', () => {
    const wrapper: any = setup({ darkMode: true });
    const theme = wrapper.props().theme;

    expect(theme).toBe(DarkTheme);
  });

  test('Displays score in correct format.', () => {
    const wrapper = setup({ players: [new Player('xx'), new Player('oo')] });
    const receivedScore = wrapper.find("[data-test='toolbar']").prop('score');

    expect(receivedScore).toBe('xx 0:0 oo');
  });

  test('Theme button calls correct function.', () => {
    const wrapper = setup();
    const spy = spyOn(wrapper.instance(), '_switchTheme');

    wrapper.instance().forceUpdate();
    wrapper.find("[data-test='toolbar']").find("[data-test='themeButton']").simulate('click');

    expect(spy).toHaveBeenCalledTimes(1);
  });

  test('Delete button calls correct function.', () => {
    const wrapper = setup();
    const spy = spyOn(wrapper.instance(), '_restart');

    wrapper.instance().forceUpdate();
    wrapper.find("[data-test='toolbar']").find("[data-test='deleteButton']").simulate('click');

    expect(spy).toHaveBeenCalledTimes(1);
  });

  test('Board has nine children.', () => {
    const wrapper = setup();
    const children = wrapper.find("[data-test='board']").children().length;

    expect(children).toBe(9);
  });

  test('Fields display correct text.', () => {
    const wrapper = setup();
    let fields = wrapper.instance().state.fields;

    wrapper.setState({
      fields: fields.map((item, index) => {
        item.content = index.toString();
        return item;
      })
    });

    const expected = wrapper.instance().state.fields;
    const received = wrapper.find("[data-test='board']").children().map(item => item.props())

    expect(expected).toStrictEqual(received);
  });

  test('Fields call correct function with correct params.', () => {
    spyOn(Page.prototype, '_selectField');
    const wrapper = setup();

    wrapper.find("[data-test='board']").children().forEach((item, index) => {
      item.simulate('click');
      expect(Page.prototype._selectField).toHaveBeenLastCalledWith(index);
    });
  });

  test('Is able to display UserDialog.', () => {
    const wrapper = setup({ userDialogVisible: true });
    const child = wrapper.find("[data-test='UserDialog']");

    expect(child).toHaveLength(1);
  });

  test('Is able to hide UserDialog.', () => {
    const wrapper = setup({ userDialogVisible: false });
    const child = wrapper.find("[data-test='UserDialog']");

    expect(child).toHaveLength(0);
  });

  test('UserDialog has three children.', () => {
    const wrapper = setup({ userDialogVisible: true });
    const children = wrapper.find("[data-test='UserDialog']").children().length;

    expect(children).toBe(3);
  });

  test('TextFields display correct data.', () => {
    const wrapper = setup({ userDialogVisible: true });
    let textFields = wrapper.instance().state.textFields;

    wrapper.setState({
      textFields: textFields.map((item, index) => {
        item.label = `l${index.toString()}`;
        item.placeholder = `p${index.toString()}`;
        item.value = `v${index.toString()}`;
        item.isValid = false;

        return item;
      })
    });

    const expected = wrapper.instance().state.textFields;
    const received = wrapper.find("[data-test='UserDialog']").children().slice(0, 2).map(item => item.props())

    expect(expected).toStrictEqual(received);
  });

  test('TextFields call correct function with correct params.', () => {
    spyOn(Page.prototype, '_onChange');
    const wrapper = setup({ userDialogVisible: true });

    wrapper.find("[data-test='UserDialog']").children().slice(0, 2).forEach((item, index) => {
      item.simulate('change');
      expect(Page.prototype._onChange).toHaveBeenLastCalledWith(index);
    });
  });

  test('Save button calls correct function.', () => {
    const wrapper = setup({ userDialogVisible: true });
    const spy = spyOn(wrapper.instance(), '_savePlayers');

    wrapper.instance().forceUpdate();
    wrapper.find("[data-test='UserDialog']").find("[data-test='saveButton']").simulate('click');

    expect(spy).toHaveBeenCalledTimes(1);
  });

  test('Is able to display MessageDialog.', () => {
    const wrapper = setup({ messageDialogVisible: true });
    const child = wrapper.find("[data-test='MessageDialog']");

    expect(child).toHaveLength(1);
  });

  test('Is able to hide MessageDialog.', () => {
    const wrapper = setup({ messageDialogVisible: false });
    const child = wrapper.find("[data-test='MessageDialog']");

    expect(child).toHaveLength(0);
  });

  test('MessageDialog has two children.', () => {
    const wrapper = setup({ messageDialogVisible: true });
    const children = wrapper.find("[data-test='MessageDialog']").children().length;

    expect(children).toBe(2);
  });

  test('MessageDialog displays correct message.', () => {
    const expectedMessage = 'qwertz';
    const wrapper = setup({ message: expectedMessage, messageDialogVisible: true });
    const receivedMessage = wrapper.find("[data-test='MessageDialog']").find("[data-test='message']").prop('text');

    expect(receivedMessage).toBe(expectedMessage);
  });

  test('Restart button calls correct function.', () => {
    const wrapper = setup({ messageDialogVisible: true });
    const spy = spyOn(wrapper.instance(), '_restart');

    wrapper.instance().forceUpdate();
    wrapper.find("[data-test='MessageDialog']").find("[data-test='restartButton']").simulate('click');

    expect(spy).toHaveBeenCalledTimes(1);
  });

  test('Is able to display LoaderDialog.', () => {
    const wrapper = setup({ loaderVisible: true });
    const child = wrapper.find("[data-test='LoaderDialog']");

    expect(child).toHaveLength(1);
  });

  test('Is able to hide LoaderDialog.', () => {
    const wrapper = setup({ loaderVisible: false });
    const child = wrapper.find("[data-test='LoaderDialog']");

    expect(child).toHaveLength(0);
  });

  test('LoaderDialog has one child.', () => {
    const wrapper = setup({ loaderVisible: true });
    const children = wrapper.find("[data-test='LoaderDialog']").children().length;

    expect(children).toBe(1);
  });
});

describe('Page, functions', () => {
  describe('componentDidMount', () => {
    test('Should call correct function.', () => {
      const wrapper = setup();
      const instance = wrapper.instance();

      spyOn(Page.prototype, '_verifyPlayers');
      instance.componentDidMount();

      expect(Page.prototype._verifyPlayers).toHaveBeenCalledTimes(1);
    });
  });

  describe('_verifyPlayers', () => {
    test('Should display UserDialog when no player was found and MessageDialog isnt visible.', () => {
      const wrapper = setup({ userDialogVisible: false, messageDialogVisible: false });
      const instance = wrapper.instance();

      instance._playerHandler.loadPlayer = jest.fn().mockReturnValue(new JestMockPromise((resolve) => resolve(null)));
      instance._verifyPlayers();

      expect(instance.state.userDialogVisible).toBeTruthy();
    });

    test('Should not display UserDialog when no player was found and MessageDialog is visible.', () => {
      const wrapper = setup({ userDialogVisible: false, messageDialogVisible: true });
      const instance = wrapper.instance();

      instance._playerHandler.loadPlayer = jest.fn().mockReturnValue(new JestMockPromise((resolve) => resolve(null)));
      instance._verifyPlayers();

      expect(instance.state.userDialogVisible).toBeFalsy();
    });

    test('Should load all players when players were found.', () => {
      const wrapper = setup();
      const instance = wrapper.instance();

      const player0 = new Player('Hans');
      player0.points = 3;

      const player1 = new Player('heinz');
      player1.points = 2;

      instance._playerHandler.loadPlayer = jest.fn()
        .mockReturnValueOnce(new JestMockPromise((resolve) => resolve(player0)))
        .mockReturnValueOnce(new JestMockPromise((resolve) => resolve(player1)));

      instance._verifyPlayers();

      expect(instance.state.players[0]).toBe(player0);
      expect(instance.state.players[1]).toBe(player1);
    });
  });

  describe('_savePlayers', () => {
    test('Should mark empty TextFields as inValid.', () => {
      const wrapper = setup();
      const instance = wrapper.instance();
      let textFields = instance.state.textFields;

      instance._playerHandler.savePlayer = jest.fn();
      instance._savePlayers();

      let index = 0;

      for (index; index < textFields.length; index++) {
        expect(textFields[index].isValid).toBeFalsy();

        textFields[index].value = '1234';
        instance._savePlayers();

        expect(textFields[index].isValid).toBeTruthy();
      }

      expect(index).toBe(2);
    });

    test('Should call savePlayer twice if no TextField is Empty.', () => {
      const wrapper = setup();
      const instance = wrapper.instance();
      let textFields = instance.state.textFields;

      spyOn(PlayerHandler.prototype, 'savePlayer');

      for (let index = 0; index < textFields.length; index++) {
        textFields[index].value = '1234';
      }

      instance._savePlayers();
      expect(PlayerHandler.prototype.savePlayer).toHaveBeenCalledTimes(2);
    });

    test('Should not call savePlayer if there is an empty TextField.', () => {
      const wrapper = setup();
      const instance = wrapper.instance();
      let textFields = instance.state.textFields;

      spyOn(PlayerHandler.prototype, 'savePlayer');

      for (let index = 1; index < textFields.length; index++) {
        textFields[index].value = '1234';
        instance._savePlayers();
      }

      expect(PlayerHandler.prototype.savePlayer).not.toHaveBeenCalled();
    });
  });

  describe('_selectField', () => {
    test('Should do nothing, when a field already has text in it.', () => {
      const wrapper = setup();
      const instance = wrapper.instance();
      const spy = spyOn(instance, 'setState');
      let fields = instance.state.fields;

      fields[2].content = '1234';
      instance._selectField(2);

      expect(fields[2].content).toBe('1234');
      expect(spy).not.toBeCalled();
    });

    test('Should switch between X an O.', () => {
      const wrapper = setup();
      const instance = wrapper.instance();
      const spy = spyOn(instance, 'setState');
      const fields = instance.state.fields;

      instance._isEmpty = jest.fn().mockReturnValue(true);

      for (let index = 0; index < fields.length; index++) {
        instance._selectField(index);
        expect(fields[index].content).toBe(index % 2 === 0 ? 'X' : 'O');
      }

      expect(spy).toBeCalledTimes(9);
    });

    test('Should call _displayWinner when someone wins.', () => {
      const wrapper = setup();
      const instance = wrapper.instance();
      const spy = spyOn(instance, '_displayWinner');
      const COMBINATIONS_TO_WIN_THE_GAME = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

      instance._playerHandler.savePlayer = jest.fn();

      for (const combination of COMBINATIONS_TO_WIN_THE_GAME) {
        combination.forEach(field => {
          instance._selectField(field);
          instance._moves = 0;
        });

        instance._restart();
      }

      expect(spy).toBeCalledTimes(8);
    });

    test('Should call _displayMessage with param "Unentschieden!" when there is no empty field left.', () => {
      const wrapper = setup();
      const instance = wrapper.instance();
      const spy = spyOn(instance, '_displayMessage');
      const fields = instance.state.fields;

      for (let index = 1; index < fields.length; index++) {
        expect(instance._checkIfDraw(fields)).toBeFalsy();
        fields[index].content = index.toString();
      }

      instance._selectField(0);
      expect(spy).toHaveBeenCalledWith('Unentschieden!');
    });
  });

  describe('_displayWinner', () => {
    test('Should add one point.', () => {
      const wrapper = setup();
      const instance = wrapper.instance();
      instance._playerHandler.savePlayer = jest.fn();

      expect(instance.state.players[0].points).toBe(0);
      expect(instance.state.players[1].points).toBe(0);

      instance._displayWinner(0);
      instance._displayWinner(0);
      instance._displayWinner(1);

      expect(instance.state.players[0].points).toBe(2);
      expect(instance.state.players[1].points).toBe(1);
    });

    test('Should save player.', () => {
      const wrapper = setup();
      const instance = wrapper.instance();

      instance._playerHandler.savePlayer = jest.fn();
      instance._displayWinner(0);

      expect(instance._playerHandler.savePlayer).toBeCalledTimes(1);
    });

    test('Should call _displayMessage once.', () => {
      const wrapper = setup();
      const instance = wrapper.instance();
      const spy = spyOn(instance, '_displayMessage');

      instance._playerHandler.savePlayer = jest.fn();
      instance._displayWinner(0);

      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('_displayMessage', () => {
    test('Should display MessageDialog with correct message.', () => {
      const wrapper = setup({ message: '' });
      const instance = wrapper.instance();

      instance._displayMessage('1234');
      const receivedMessage = wrapper.find("[data-test='message']").prop('text');

      expect(receivedMessage).toBe('1234');
    });

    test('Should hide all other dialogs.', () => {
      const wrapper = setup({ message: '' });

      const userDialog = wrapper.find("[data-test='UserDialog']");
      const loaderDialog = wrapper.find("[data-test='LoaderDialog']");

      expect(userDialog).toEqual({});
      expect(loaderDialog).toEqual({});
    });
  });

  describe('_switchTheme', () => {
    test('Should set darkMode to true if false.', () => {
      const wrapper = setup({ darkMode: false });
      const instance = wrapper.instance();

      instance._switchTheme();
      expect(instance.state.darkMode).toBeTruthy();
    });

    test('Should set darkMode to false if true.', () => {
      const wrapper = setup({ darkMode: true });
      const instance = wrapper.instance();

      instance._switchTheme();
      expect(instance.state.darkMode).toBeFalsy();
    });
  });

  describe('_checkIfDraw', () => {
    test('Should return true if there is no empty field left.', () => {
      const wrapper = setup();
      const instance = wrapper.instance();
      let fields = instance.state.fields;

      for (let index = 0; index < fields.length; index++) {
        expect(instance._checkIfDraw(fields)).toBeFalsy();
        fields[index].content = index.toString();
      }

      expect(instance._checkIfDraw(fields)).toBeTruthy();
    });
  });

  describe('_deleteData', () => {
    test('Should call _restart once.', () => {
      const wrapper = setup();
      const instance = wrapper.instance();
      const spy = spyOn(instance, '_restart');

      instance.forceUpdate();
      instance._deleteData();

      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('Should delete all players.', () => {
      const wrapper = setup();
      const instance = wrapper.instance();

      spyOn(PlayerHandler.prototype, 'deletePlayer');
      instance._deleteData();

      expect(PlayerHandler.prototype.deletePlayer).toHaveBeenCalledTimes(2);
    });
  });

  describe('_isEmpty', () => {
    test('Should return true if string length === 0.', () => {
      const wrapper = setup();
      const instance = wrapper.instance();

      expect(instance._isEmpty('')).toBeTruthy();
    });

    test('Should return false if string length > 0.', () => {
      const wrapper = setup();
      const instance = wrapper.instance();

      expect(instance._isEmpty('1234')).toBeFalsy();
    });

    test('Should return true if string only contains blanks.', () => {
      const wrapper = setup();
      const instance = wrapper.instance();

      expect(instance._isEmpty('   ')).toBeTruthy();
    });
  });

  describe('_onChange', () => {
    test('Should change value of correct TextField.', () => {
      const wrapper = setup();
      const instance = wrapper.instance();
      const textFields = instance.state.textFields;

      textFields.forEach((_, index) => {
        expect(textFields[index].value).toBe('');

        instance._onChange(index, {
          target: {
            value: '1234',
          }
        } as React.ChangeEvent<HTMLInputElement>);

        expect(textFields[index].value).toBe('1234');
      });
    });
  });

  describe('_restart', () => {
    test('Should reset moves and state.', () => {
      const wrapper = setup({ message: '1234' });
      const instance = wrapper.instance();

      instance._moves = 1234;
      instance._restart();

      expect(instance._moves).toBe(0);
      expect(JSON.stringify(instance.state)).toBe(JSON.stringify(instance._initialState));
    });

    test('Should call _verifyPlayers once.', () => {
      const wrapper = setup();

      spyOn(Page.prototype, '_verifyPlayers');
      wrapper.instance()._restart();

      expect(Page.prototype._verifyPlayers).toHaveBeenCalledTimes(1);
    });
  });
});