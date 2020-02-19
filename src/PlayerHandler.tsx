import Player from './Player';

export default class PlayerHandler {
  save(id: number, player: Player) {
    document.cookie = `${id}=${JSON.stringify(player)}`;
  }

  load(id: number): Player {
    const cookies = document.cookie.split(/\; */);

    const KEY = 0;
    const VALUE = 1;

    for (const item of cookies) {
      const cookie = item.split(/\=/);

      if (cookie[KEY] === id.toString()) {
        return JSON.parse(cookie[VALUE]);
      }
    }

    return null;
  }

  delete(id: number) {
    document.cookie = id + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  }
}
