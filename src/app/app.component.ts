import { Component } from '@angular/core';
import { Game } from './models/game';
import { Player } from './models/player';

interface StartGame {
  player: Player,
  isNew: boolean
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public resultMessage: string = '';
  public aiIndex: number = NaN;
  public start!: StartGame;
  public game: Game = new Game();

  constructor() {
    this.resetGame();
  }

  public setMessage(message: string): void {
    this.resultMessage = message;
    this.start.isNew = true;
    this.resetGame();
  }

  private resetGame(): void {
    this.start = {
      player: new Player(),
      isNew: true
    };
    this.start.player.name = '';
    this.start.player.choice = '';
    this.game.board = [];
  }

  public startGame(start: StartGame): void {
    console.log("player: ", start.player);
    this.resultMessage = '';
    this.start.player = new Player().load(start.player);
  }

  public setBoard(board: string[]): void {
    this.game.board = board;
  }

  public setMove(move: string): void {
    this.start.player.choice = move;
  }

  public setAIMove(move: number): void {
    this.aiIndex = move;
  }
}
