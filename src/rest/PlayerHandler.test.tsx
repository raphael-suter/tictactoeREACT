import 'jest-fetch-mock';
import Player from '../model/Player';
import PlayerHandler from './PlayerHandler';

const setup = (groupId = '1234') => {
  Object.defineProperty(window, "localStorage", {
    value: {
      getItem: jest.fn().mockReturnValue(groupId),
      setItem: jest.fn()
    },
    writable: true
  });

  return new PlayerHandler(null);
}

describe('PlayerHandler', () => {
  describe('constructor', () => {
    test('Should load groupId from localStorage.', () => {
      const testee = setup();
      expect(testee._groupId).toBe('1234');
    });

    test('Should use "new" as groupId if there is no entry in the localStorage.', () => {
      const testee = setup(null);
      expect(testee._groupId).toBe('new');
    });
  });

  describe('savePlayer', () => {
    test('Should call fetch with correct params.', () => {
      const testee = setup();
      const player = new Player('Hans');
      const spy = jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve(new Response(JSON.stringify({}))));

      testee.savePlayer(0, player);

      expect(spy).toBeCalledWith('http://localhost:8000/v1/1234/0', {
        method: 'PUT',
        body: JSON.stringify(player),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      });

      global.fetch.mockClear();
    });

    test('Should replace groupId.', async (done) => {
      const testee = setup('new');

      jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve(new Response(JSON.stringify('qwertz'))));
      await testee.savePlayer(0, null);

      expect(testee._groupId).toBe('qwertz');
      expect(localStorage.setItem).toBeCalledWith('groupId', 'qwertz');

      global.fetch.mockClear();
      done();
    });
  });

  describe('loadPlayer', () => {
    test('Should call fetch with correct params if groupId is not "new".', () => {
      const testee = setup();
      const spy = jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve(new Response(JSON.stringify({}))));

      testee.loadPlayer(0);
      expect(spy).toBeCalledWith('http://localhost:8000/v1/1234/0');

      global.fetch.mockClear();
    });

    test('Should not call fetch and instead return empty Promise if groupId is "new".', () => {
      const testee = setup('new');
      const spy = spyOn(global, 'fetch');

      testee.loadPlayer(0)
        .then(data => {
          expect(spy).not.toBeCalled();
          expect(data).toBeNull();
        });
    });
  });

  describe('deletePlayer', () => {
    test('Should call fetch with correct params if groupId is not "new".', () => {
      const testee = setup();
      const spy = jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve(null));

      testee.deletePlayer(0);

      expect(spy).toBeCalledWith('http://localhost:8000/v1/1234/0', {
        method: 'DELETE'
      });

      global.fetch.mockClear();
    });

    test('Should not call fetch if groupId is "new".', () => {
      const testee = setup('new');
      const spy = jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve(null));

      testee.deletePlayer(0);
      expect(spy).not.toBeCalled();

      global.fetch.mockClear();
    });
  });

  describe('_try', () => {
    test('Should catch error, call notify and return empty Promise', async (done) => {
      const testee = setup();
      const spy = spyOn(testee, '_notify');
      const data = await new Promise((_, reject) => reject()).catch(testee._handleError);

      expect(spy).toBeCalledTimes(1);
      expect(data).toBe(null);

      done();
    });
  });
});
