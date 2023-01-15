import { Player } from './player';
export class Game {
  board!: string[];
  currentPlay!: string;
  player!: Player;

  public load(data: any): Game {
    Object.assign(this, data);

    return this;
  }
}
