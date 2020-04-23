import Player from '../model/Player';
import API_Endpoint from './API_Endpoint';

export default class PlayerHandler {
  _groupId: string;
  _notify: (message: string) => void;

  constructor(_notify: (message: string) => void) {
    this._groupId = localStorage.getItem('groupId') || 'new';
    this._notify = _notify;
  }

  savePlayer(id: number, player: Player): void {
    this._try(
      fetch(`${API_Endpoint}/${this._groupId}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(player),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      })
        .then(response => response.json())
        .then(_groupId => {
          this._groupId = _groupId;
          localStorage.setItem('groupId', _groupId);
        })
    );
  }

  loadPlayer(id: number): Promise<Player> {
    let promise;

    if (this._groupId === 'new') {
      promise = new Promise<Player>((resolve) => resolve(null));
    } else {
      promise =
        this._try(
          fetch(`${API_Endpoint}/${this._groupId}/${id}`)
            .then(response => response.json())
        );
    }

    return promise;
  }

  deletePlayer(id: number): void {
    if (this._groupId !== 'new') {
      this._try(fetch(`${API_Endpoint}/${this._groupId}/${id}`, {
        method: 'DELETE'
      }));
    }
  }

  _try(promise: Promise<any>): Promise<null> {
    return promise.catch(() => {
      this._notify('Ein unbekannter Fehler ist aufgetreten.');
      return null;
    });
  }
}
