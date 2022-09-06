import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

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
  private aiPlay: string = '';
  private human: string = 'circle'
  private currentPlayer: string = this.human;

  constructor() { }

  public ngOnInit(): void {
  }

  public getChange(): boolean {
    let toReturn: boolean = false;
    const count: number = this.getMarksCount();
    if (count !== this.boardLength && count !== 0) {
      setTimeout((): void => {
        this.boardLength = count;
        this.move.emit(this.getMove());
      }, 500);
      if (this.aiPlay === '') {
        this.aiPlay = this.play
      }
      // console.log("this.board: \n", this.board);
      // console.log(this.play);
      toReturn = true;
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
    let toReturn!: number;
    toReturn = 8;
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

  private minimax(board: number, depth: number, isMaximizing: boolean): number {
    return 1;
  }

}
