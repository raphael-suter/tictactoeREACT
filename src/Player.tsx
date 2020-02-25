export default class Player {
  public static X = 0;
  public static O = 1;

  public name: string;
  public points: number;

  constructor(name = '') {
    this.name = name;
    this.points = 0;
  }
}
