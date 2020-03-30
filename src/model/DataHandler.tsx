import Player from './Player';

export default class DataHandler {
  private groupId: string;
  private notify: (message: string) => void;

  constructor(notify: (message: string) => void) {
    this.groupId = localStorage.getItem('groupId') || 'new';
    this.notify = notify;
  }

  public savePlayer(id: number, player: Player): void {
    const { name, points } = player;

    this.try(
      fetch(`http://localhost:8000/savePlayer/${this.groupId}/${id}/${name}/${points}`)
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
          fetch(`http://localhost:8000/loadPlayer/${this.groupId}/${id}`)
            .then(response => {
              return response.json();
            })
        );
    }

    return promise;
  }

  public deletePlayer(id: number): void {
    if (this.groupId !== 'new') {
      this.try(fetch(`http://localhost:8000/deletePlayer/${this.groupId}/${id}`));
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
