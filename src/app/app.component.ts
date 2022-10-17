import { Component, ViewChild } from '@angular/core';
import { BoardComponent } from './board/board.component';
import { Player } from './models/player';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild('boardElement') boardElement: BoardComponent = new BoardComponent;

  public reset: boolean = true;
  public gameResult: string = '';
  public board: string[] = [];
  public currentMove: string = '';
  public index: number = NaN;
  public player: Player = new Player();

  public setMessage(message: string): void {
    this.reset = false;
    this.gameResult = message;
  }

  public resetGame(player: Player): void {
    console.log("player: ", player);
    this.gameResult = '';
    this.player = player;
    this.reset = false;
    // this.reset = reset;
  }

  public setBoard(board: string[]): void {
    this.board = board;
  }

  public setMove(move: string): void {
    this.currentMove = move;
  }

  public setAIMove(move: number): void {
    this.boardElement.aiIndex = move;
    this.boardElement.handleClick(move);
  }
}
