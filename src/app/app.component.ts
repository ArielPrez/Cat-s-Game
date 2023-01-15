import { Component } from '@angular/core';
import { Game } from './models/game';
import { StringService } from './service/string.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  private winningComb: number[][] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  public winnerMessage: string = '';
  public aiIndex: number = NaN;
  public isNew: boolean = true;
  public game: Game = new Game();

  constructor(public stringService: StringService) { }

  public getNew(): boolean {
    return this.isNew;
  }

  public startGame(game: Game): void { // First method to be called
    this.winnerMessage = '';
    this.game = new Game().load(game);
  }

  public setBoard(board: string[]): void {
    this.game.board = board;

    if (this.checkWin()) {
      this.endGame(false);
    } else if(this.isDraw()) {
      this.endGame(true);
    } else {
      this.game.currentPlay = this.game.currentPlay === 'x' ? 'circle' : 'x';
    }
  }

  public setAIMove(move: number): void {
    this.aiIndex = move;
  }

  private checkWin(): boolean {
    return this.winningComb.some(
      (combination): boolean => {
        return combination.every((i): boolean => {
          return this.game.board[i] === this.game.currentPlay;
        })
      });
  }

  private isDraw(): boolean {
    return this.game.board.every(
      b => b === 'x' || b === 'circle'
    );
  }

  private endGame(draw: boolean): void {

    if (draw) {
      this.winnerMessage = 'draw'; // Draw
    } else {
      this.winnerMessage = this.game.currentPlay; // Win
    }

    this.game.player.choice = '';

  }

}
