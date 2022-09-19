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
  public aiPlay: string = '';
  private human: string = '';
  private winningComb: number[][] = [
    [0, 1, 2], // 0
    [3, 4, 5], // 1
    [6, 7, 8], // 2
    [0, 3, 6], // 3
    [1, 4, 7], // 4
    [2, 5, 8], // 5
    [0, 4, 8], // 6
    [2, 4, 6]  // 7
  ];
  private count: number = 0;

  constructor() { }

  public ngOnInit(): void {}

  public getChange(): boolean {
    let toReturn: boolean = false;
    const count: number = this.getMarksCount();
    if (this.aiPlay === '' && this.play !== '') {
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
      this.move.emit(move);
      setTimeout((): void => { // AI Turn! =>
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
        let s: number = this.minimax(0 , true);
        console.log("s: ", s);
        this.board[i] = '';
        if (s > bestScore) {
          bestScore = s;
          // bestScore = Math.min(s, bestScore);
          console.log(this.count);
          toReturn = i;
        }
      }
    }
    return toReturn;
  }

  private checkWin(): number {
    return this.winningComb.some(
              (combination): boolean => {
                return combination.every((i): boolean => {
                  return this.board[i] === 'x';
                }) ? true : false;
              }) ? 10
            : this.winningComb.some(
              (combination): boolean => {
                return combination.every((i): boolean => {
                  return this.board[i] === 'circle';
                }) ? true : false;
              }) ? -10
            : 0 ;
  }

  //[-][-][-][-][-][-][-][-][-][-][-][-][-][-][-][-][-][-][-][-][-][-]

  // It considers all the possible ways the game can go and returns the value of the board

  private minimax(depth: number, isMaximizing: boolean): number {
    let score: number = this.checkWin();
    if (score !== 0) {
      this.count++;
      return score;
    } else {
      if (isMaximizing) { // X turn
        let best: number = -1000;
        for (let i: number = 0; i < this.board.length; i++) {
          if (this.board[i] === '') {
            this.board[i] = this.human;
            let s: number = this.minimax(depth + 1, !isMaximizing);
            this.board[i] = '';
            // if (s > score) {
            //   score = s;
            // }
            best = Math.max(s, best);
          }
        }
        return best;
      } else { // Circle turn
        let best: number = 1000;
        for (let i: number = 0; i < this.board.length; i++) {
          if (this.board[i] === '') {
            this.board[i] = this.aiPlay;
            let s: number = this.minimax(depth + 1, !isMaximizing);
            this.board[i] = '';
            // if (s < score) {
            //   score = s;
            // }
            best = Math.min(s, best);
          }
        }
        return best;
      }
    }
  }

}
