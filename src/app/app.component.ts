import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public reset: boolean = false;
  public gameResult: string = '';
  public board: string[] = [];
  public currentMove: string = '';
  public index: number = NaN;

  public setMessage(message: string): void {
    this.reset = false;
    this.gameResult = message;
  }

  public resetGame(reset: boolean): void {
    this.gameResult = '';
    this.reset = reset;
  }

  public setBoard(board: string[]): void {
    this.board = board;
  }

  public setMove(move: string): void {
    this.currentMove = move;
  }

  public setAIMove(move: number): void {
    this.index = move;
  }
}
