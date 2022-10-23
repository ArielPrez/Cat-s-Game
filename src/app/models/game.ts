export class Game {
  board!: string[];
  currentPlay!: string;

  public load(data: any): Game {
    Object.assign(this, data);

    return this;
  }
}
