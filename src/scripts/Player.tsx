export default class Player {
  private _name: string;
  private _points: number;

  constructor(name = '') {
    this._name = name;
    this._points = 0;
  }

  get name(): string {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
  }

  get points(): number {
    return this._points;
  }

  set points(points: number) {
    this._points = points;
  }
}
