import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { BoardComponent } from '../board/board.component';

@Component({
  selector: 'app-ai-player',
  templateUrl: './ai-player.component.html',
  styleUrls: ['./ai-player.component.scss']
})
export class AiPlayerComponent implements OnInit {

  @ViewChild('boardElement') boardElement: BoardComponent = new BoardComponent;

  @Input() board!: Array<string>;
  @Input() play!: string;
  @Output() move: EventEmitter<number> = new EventEmitter();

  private boardLength: number = 0;

  private w: number = 0; // width / 3
  private h: number = 0; // height / 3
  public aiPlay: string = '';
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
  private human: string = '';
  // private currentPlayer: string = this.human;

  constructor() { }

  public ngOnInit(): void {
  }

  public getChange(): boolean {
    let toReturn: boolean = false;
    const count: number = this.getMarksCount();
    if (this.aiPlay === '') {
      this.aiPlay = this.play
      if (this.aiPlay === 'x') {
        this.human = 'circle';
      } else {
        this.human = 'x';
      }
    }
    if (count !== this.boardLength && count !== 0 && this.play === this.aiPlay) {
      this.boardLength = count;
      const move: number = this.bestMove();
      console.log("Board value: ", this.evaluate());
      this.move.emit(move);
      toReturn = true;
      // setTimeout((): void => { // AI Turn! =>
      // }, 500);
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

  private bestMove(): number { // Minimax
    // let toReturn: number = Math.floor(Math.random() * 9 );
    // if (this.board[toReturn] !== '') {
    //   toReturn = this.bestMove();
    // }

    let toReturn: number = -1; // Index in the board of the best posible move;
    let bestScore: number = -Infinity; // The score for a move.

    for (let i: number = 0; i < this.board.length; i++) {
      if (this.board[i] === '') {
        this.board[i] = this.aiPlay;
        let score: number = this.minimax(0, false);
        this.board[i] = '';
        bestScore = Math.min(score, bestScore);
      }
    }

    // if (this.aiPlay === player) {
    // }
      // for (let j: number = 0; j < 3; j++) {
      // }

    // board[move.i][move.j] = ai;
    // currentPlayer = human;
    return toReturn;
  }

  private evaluate(): number {
    let value: number = 0;

    this.winningComb
        .forEach((combination: number[], i: number): void => {
          if (value === 0) {
            combination.forEach((c: number): void => {
              if (this.board[c] === this.aiPlay && i < 3) { // Horizontal x 3
                value -= 10;
              } else if (this.board[c] === this.aiPlay && i > 2 && i < 6) { // Vertical x 3
                value -= 10;
              } else if (this.board[c] === this.aiPlay) { // Diagonal x 2
                value -= 10;
              }
            });
            if (value > -30) {
              value = 0;
              combination.forEach((c: number): void => {
                if (this.board[c] === this.play && i < 3) { // Horizontal x 3
                  value += 10;
                } else if (this.board[c] === this.play && i > 2 && i < 6) { // Vertical x 3
                  value += 10;
                } else if (this.board[c] === this.play) { // Diagonal x 2
                  value += 10;
                }
              });
            }
            if (value === 30) {
              console.log("x win!!!");
            } else if(value === -30) {
              console.log('circle win!!');
            } else {
              value = 0;
              console.log("/\ draw or empty spot /");
            }
          }
          // console.log(i+' : '+value);
    });
    return value;
  }

  private isMovesLeft(): boolean {
    return !this.board.some(c => c !== '');
  }

  //[-][-][-][-][-][-][-][-][-][-][-][-][-][-][-][-][-][-][-][-][-][-]

  // private setup(): void {
  //   // this.nextTurn();
  // }

  // private equals3(a: string, b: string, c: string): boolean {
  //   return a === b && b === c && a !== '';
  // }

  // private mousePressed(): void {
  //   // if (currentPlayer === human) {
  //   //   let i = floor(mouseX / w);
  //   //   let j = floor(mouseY / h);
  //   //   if (this.board[i][j] === '') {
  //   //     this.board[i][j] = human;
  //   //     currentPlayer = ai;
  //   //     this.bestMove();
  //   //   }
  //   // }
  // }

  // private bestMove(): void {
  //   let bestScore: number = -Infinity;
  //   let move: number;
  //   for (let i: number = 0; i < 3; i++) {
  //     for (let j: number = 0; j < 3; j++) {
  //       if (this.board[i][j] === '') {
  //         this.board[i][j] = ai;
  //         let score: number = minimax(this.board);
  //         this.board[i][j] = '';
  //         if (score > bestScore) {
  //           bestScore = score;
  //           move = { i, j };
  //         }
  //       }
  //     }
  //   }

  //   board[move.i][move.j] = ai;
  //   currentPlayer = human;

  // }

  // It considers all the possible ways the game can go and returns the value of the board

  private minimax(depth: number, isMaximizing: boolean): number {
    let score: number = this.evaluate();
    if (score === 10) {
      return score;
    } else if (score === -10) {
      return score;
    }
    if (this.isMovesLeft()) {
      return 0;
    }

    if (isMaximizing) {
      let best: number = -1000;
      for (let i: number = 0; i < this.board.length; i++) {
        if (this.board[i] === '') {
          this.board[i] = this.human;
          best = Math.max(best, this.minimax(depth + 1, !isMaximizing));
          this.board[i] = '';
        }
      }
      return best;
    } else {
      let best: number = 1000;
      for (let i: number = 0; i < this.board.length; i++) {
        if (this.board[i] === '') {
          this.board[i] = this.aiPlay;
          best = Math.min(best, this.minimax(depth + 1, isMaximizing));
          this.board[i] = '';
        }
      }
      return best;
    }

    // return 1;
  }

  // private evaluate(): number {
  //   let toReturn: number = 0;

  //   for (let row: number = 0; row < 3; row++) { // Checking for Rows for X or O victory.
  //     if (this.board[row][0] === this.board[row][1] &&
  //         this.board[row][1] === this.board[row][2]) {
  //       if (this.board[row][0] === 'x') {
  //         toReturn = +10;
  //       } else {
  //         toReturn = -10;
  //       }
  //     }
  //   }

  //   console.log(toReturn);
  //   for (let col: number = 0; col < 3; col++) { // Checking for Columns for X or O victory.
  //     if (this.board[0][col] === this.board[1][col] &&
  //         this.board[1][col] === this.board[2][col]) {
  //       if (this.board[0][col] === 'x') {
  //         toReturn = +10;
  //       } else {
  //         toReturn = -10;
  //       }
  //     }
  //   }
  //   console.log(toReturn);
  //   // Checking for Diagonals for X or O victory.
  //   if (this.board[0][0] == this.board[1][1] && this.board[1][1] == this.board[2][2])
  //   {
  //       if (this.board[0][0] == 'x')
  //           toReturn +10;
  //       else
  //           toReturn -10;
  //   }
  //   console.log(toReturn);

  //   if (this.board[0][2] === this.board[1][1] &&
  //       this.board[1][1] === this.board[2][0]) {
  //     if (this.board[0][2] == 'x')
  //         toReturn +10;
  //     else
  //         toReturn -10;
  //   }

  //   return toReturn; // If none have won return 0
  // }

  // private findBestMove(board: any): void { // This will return the best possible move for the player
  //     let bestVal: number = -1000;
  //     let bestMove: { row: number, col: number } = {
  //       row: 0,
  //       col: 0
  //     };
  //     bestMove.row = -1;
  //     bestMove.col = -1;
  // }

}
