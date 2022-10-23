import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Game } from '../models/game';
import { Player } from '../models/player';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, OnChanges {

  @Input() isNew!: boolean;
  @Input() player!: Player;
  @Input() aiIndex!: number;
  @Output() message: EventEmitter<string> = new EventEmitter();
  @Output() updateBoard: EventEmitter<Array<string>> = new EventEmitter();
  @Output() updatePlay: EventEmitter<string> = new EventEmitter();

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

  public game: Game = new Game();

  constructor() {
    this.player = new Player();
    this.game.board = ['','','','','','','','',''];
    this.game.currentPlay = '';
  }

  public ngOnInit(): void {}

  public ngOnChanges(): void {
    if (this.aiIndex !== undefined &&
        !Number(isNaN(this.aiIndex)) === true) {
      this.handleClick(this.aiIndex);
    } else {
      this.setBoard();
    }
  }

  public handleClick(index: number): void {
    setTimeout((): void => {
      if (!Number.isNaN(Number(index)) && !this.checkWin()) {
        this.game.board[index] = this.game.currentPlay;
        if (this.checkWin()) {
          this.endGame(false);
        } else if(this.isDraw()) {
          this.endGame(true);
        } else {
          this.game.currentPlay = this.game.currentPlay === 'x' ? 'circle' : 'x';
        }
        this.aiIndex = NaN;
        this.updateBoard.emit(this.game.board);
        this.updatePlay.emit(this.game.currentPlay);
      }
    });

  }

  private checkWin(): boolean {
    return this.winningComb.some(
      (combination): boolean => {
        return combination.every((i): boolean => {
          return this.game.board[i] === this.game.currentPlay;
        })
      });
  }

  private endGame(draw: boolean): void {
    if (draw) {
      this.message.emit('draw'); // Draw
    } else {
      this.message.emit(this.game.currentPlay); // Win
    }
    this.clearBoard();
  }

  private isDraw(): boolean {
    return this.game.board.every(
      c => c === 'x' || c === 'circle'
    );
  }

  private setBoard(): void {
    setTimeout((): void => {
      this.isNew = false;
      this.game.board = ['','','','','','','','',''];
      this.game.currentPlay = this.player.choice;
    }, 0);
  }

  public clearBoard(): void {
    setTimeout((): void => {
      this.isNew = true;
      this.game.board = ['','','','','','','','',''];
      this.game.currentPlay = '';
      // this.game.currentPlay = this.player.choice;
      // this.isCircle = this.player.choice === 'x' ?
      //                 this.isCircle = false : this.isCircle = true;
    }, 0);
  }

  public getMessage(): string {
    let toReturn: string = '';
    if (this.game.currentPlay !== '' &&
        this.player.choice) {
      if (this.game.currentPlay === this.player.choice) {
        toReturn = 'Your turn!';
      } else {
        toReturn = 'Now I will move!';
      }
    }
    return toReturn;
  }

}
