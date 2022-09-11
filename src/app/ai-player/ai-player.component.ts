import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { BoardComponent } from '../board/board.component';

@Component({
  selector: 'app-ai-player',
  templateUrl: './ai-player.component.html',
  styleUrls: ['./ai-player.component.scss']
})
export class AiPlayerComponent implements OnInit {

  @Input() board!: Array<string>;
  @Input() play!: string;
  @Output() move: EventEmitter<number> = new EventEmitter();

  private boardLength: number = 0;

  private w: number = 0; // width / 3
  private h: number = 0; // height / 3
  public aiPlay: string = '';
  // private human: string = 'circle'
  // private currentPlayer: string = this.human;

  constructor() { }

  public ngOnInit(): void {
  }

  public getChange(): boolean {
    let toReturn: boolean = false;
    const count: number = this.getMarksCount();
    if (this.aiPlay === '') {
      this.aiPlay = this.play
    }
    if (count !== this.boardLength && count !== 0) {
      this.boardLength = count;

      setTimeout((): void => {
        if (this.board.some(b=>b !== '') && this.play === this.aiPlay) {
          const move: number = this.getMove();
          this.move.emit(move);
        }
        toReturn = true;
      }, 500);
    }
    return toReturn;
  }

  private getMarksCount(): number {
    let toReturn: number = 0;
    this.board.forEach(
      (b): void => {
        if (b !== '') {
          toReturn++;
        }
      }
    );
    return toReturn;
  }

  private getMove(): number {
    let toReturn: number = Math.floor(Math.random() * 9 );
    if (this.board[toReturn] !== '') {
      toReturn = this.getMove();
    }
    return toReturn;
  }

  //[-][-][-][-][-][-][-][-][-][-][-]

  private setup(): void {
    // this.nextTurn();
  }

  private equals3(a: string, b: string, c: string): boolean {
    return a === b && b === c && a !== '';
  }

  private mousePressed(): void {
    // if (currentPlayer === human) {
    //   let i = floor(mouseX / w);
    //   let j = floor(mouseY / h);
    //   if (this.board[i][j] === '') {
    //     this.board[i][j] = human;
    //     currentPlayer = ai;
    //     this.bestMove();
    //   }
    // }
  }

  private bestMove(): void {
    // let bestScore: number = -Infinity;
    // let move: number;
    // for (let i: number = 0; i < 3; i++) {
    //   for (let j: number = 0; j < 3; j++) {
    //     if (this.board[i][j] === '') {
    //       this.board[i][j] = ai;
    //       let score: number = minimax(this.board);
    //       this.board[i][j] = '';
    //       if (score > bestScore) {
    //         bestScore = score;
    //         move = { i, j };
    //       }
    //     }
    //   }
    // }

    // board[move.i][move.j] = ai;
    // currentPlayer = human;

  }

  // It considers all the possible ways the game can go and returns the value of the board
  private minimax(board: number, depth: number, isMaximizing: boolean): number {
    return 1;
  }

  private evaluate(board: string[]): number {
    let toReturn: number = 0;

    for (let row: number = 0; row < 3; row++) { // Checking for Rows for X or O victory.
      if (board[row][0] === board[row][1] &&
          board[row][1] === board[row][2]) {
        if (board[row][0] === 'x') {
          toReturn = +10;
        } else {
          toReturn = -10;
        }
      }
    }

    for (let col: number = 0; col < 3; col++) { // Checking for Columns for X or O victory.
      if (board[0][col] === board[1][col] &&
          board[1][col] === board[2][col]) {
        if (board[0][col] === 'x') {
          toReturn = +10;
        } else {
          toReturn = -10;
        }
      }
    }

    // Checking for Diagonals for X or O victory.
    if (board[0][0] == board[1][1] && board[1][1] == board[2][2])
    {
        if (board[0][0] == 'x')
            toReturn +10;
        else
            toReturn -10;
    }
    if (board[0][2] === board[1][1] &&
        board[1][1] === board[2][0]) {
      if (board[0][2] == 'x')
          toReturn +10;
      else
          toReturn -10;
    }

    return toReturn; // If none have won return 0
  }

  private findBestMove(board: any): void { // This will return the best possible move for the player
      let bestVal: number = -1000;
      let bestMove: { row: number, col: number } = {
        row: 0,
        col: 0
      };
      bestMove.row = -1;
      bestMove.col = -1;
  }

}
