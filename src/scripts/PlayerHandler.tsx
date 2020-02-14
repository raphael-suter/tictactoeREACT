import Player from './Player';

enum PLAYER {
  PLAYER_X = 'player_x',
  PLAYER_O = 'player_o'
}

class PlayerHandler {
  save(playerKey: PLAYER, player: Player) {
    document.cookie = playerKey + '=' + JSON.stringify(player);
  }

  load(playerKey: PLAYER): Player {
    for (const item of document.cookie.split('; ')) {
      const cookieKey = item.substr(0, 8);

      if (cookieKey === playerKey) {
        return Object.assign(new Player, JSON.parse(item.toString().substr(9)));
      }
    }

    return null;
  }

  delete(playerKey: PLAYER) {
    document.cookie = playerKey + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  }
}

export { PLAYER };
export default PlayerHandler;
