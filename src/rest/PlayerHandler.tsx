import Player from '../model/Player';
import API_Endpoint from './API_Endpoint';

export default class PlayerHandler {
  _groupId: string;
  _notify: (message: string) => void;

  constructor(_notify: (message: string) => void) {
    this._groupId = localStorage.getItem('groupId') || 'new';
    this._notify = _notify;
  }

  savePlayer(id: number, player: Player): Promise<void> {
    return fetch(`${API_Endpoint}/${this._groupId}/${id}`, {
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
      .catch(this._handleError);
  }

  loadPlayer(id: number): Promise<Player> {
    let promise;

    if (this._groupId === 'new') {
      promise = Promise.resolve(null);
    } else {
      promise =
        fetch(`${API_Endpoint}/${this._groupId}/${id}`)
          .then(response => response.json())
          .catch(this._handleError);
    }

    return promise;
  }

  deletePlayer(id: number): void {
    if (this._groupId !== 'new') {
      fetch(`${API_Endpoint}/${this._groupId}/${id}`, {
        method: 'DELETE'
      }).catch(this._handleError);
    }
  }

  _handleError = (): Promise<void> => {
    this._notify('Ein unbekannter Fehler ist aufgetreten.');
    return Promise.resolve(null);
  }
}
