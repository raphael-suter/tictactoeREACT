import Player from '../model/Player';

export default class PlayerHandler {
  private groupId: string;
  private notify: (message: string) => void;

  constructor(notify: (message: string) => void) {
    this.groupId = localStorage.getItem('groupId') || 'new';
    this.notify = notify;
  }

  public savePlayer(id: number, player: Player): void {
    this.try(
      fetch(`http://localhost:8000/${this.groupId}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(player),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      })
        .then(response => response.json())
        .then(groupId => {
          this.groupId = groupId;
          localStorage.setItem('groupId', groupId);
        })
    );
  }

  public loadPlayer(id: number): Promise<Player> {
    let promise;

    if (this.groupId === 'new') {
      promise = new Promise<Player>((resolve) => resolve(null));
    } else {
      promise =
        this.try(
          fetch(`http://localhost:8000/${this.groupId}/${id}`)
            .then(response => {
              return response.json();
            })
        );
    }

    return promise;
  }

  public deletePlayer(id: number): void {
    if (this.groupId !== 'new') {
      this.try(fetch(`http://localhost:8000/${this.groupId}/${id}`, {
        method: 'DELETE'
      }));
    }
  }

  private try(promise: Promise<any>): Promise<any> {
    return promise.catch(error => {
      this.notify('Ein unbekannter Fehler ist aufgetreten.');
      console.log(error);

      return null;
    });
  }
}
