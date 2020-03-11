import Player from './Player';

export default class DataHandler {
  private notify: (message: string) => void;

  constructor(notify: (message: string) => void) {
    this.notify = notify;
  }

  public savePlayer(id: number, player: Player): void {
    const { name, points } = player;
    this.try(fetch(`http://localhost:8000/savePlayer/${id}/${name}/${points}`));
  }

  public loadPlayer(id: number): Promise<Player> {
    return fetch('http://localhost:8000/loadPlayer/' + id)
      .then(response => {
        return response.json();
      });
  }

  public deletePlayer(id: number): void {
    this.try(fetch('http://localhost:8000/deletePlayer/' + id));
  }

  private try(promise: Promise<Response>): void {
    promise.catch(error => {
      this.notify('Ein unbekannter Fehler ist aufgetreten.');
      console.log(error)
    });
  }
}
