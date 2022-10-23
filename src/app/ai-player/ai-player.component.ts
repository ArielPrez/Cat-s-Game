import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { BoardComponent } from '../board/board.component';
import { Player } from '../models/player';

@Component({
  selector: 'app-ai-player',
  templateUrl: './ai-player.component.html',
  styleUrls: ['./ai-player.component.scss']
})
export class AiPlayerComponent implements OnInit {

  @Input() board!: Array<string>;
  @Input() player!: Player;
  @Output() aiMove: EventEmitter<number> = new EventEmitter();

  private boardLength: number = 0;
  public aiPlay: string = '';
  private human: string = '';
  public move: number = NaN;
  public aiMessage: string = '';
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

  constructor() { }

  public ngOnInit(): void {}

  public getChange(): boolean {
    let toReturn: boolean = false;
    const count: number = this.getMarksCount();
    if (this.player.name !== '') {
      if (this.aiPlay === '' && count !== 0) {
        this.boardLength = 0;
        this.aiPlay = this.player.choice;
        if (this.aiPlay === 'x') {
          this.human = 'circle';
        } else {
          this.human = 'x';
        }
      }
      if (count !== this.boardLength && count !== 0 && this.player.choice === this.aiPlay) {
        this.boardLength = count;
        this.move = this.bestMove();
        setTimeout((): void => { // AI Turn! =>
          if (!Number.isNaN(Number(this.move))) {
            this.aiMove.emit(this.move);
            this.move = NaN;
            toReturn = true;
          }
        }, 100);
      }
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

  private bestMove(): number {
    // let toReturn: number = Math.floor(Math.random() * 9 );
    // if (this.board[toReturn] !== '') {
    //   toReturn = this.bestMove();
    // }

    let toReturn: number = NaN; // Index in the board of the best posible move;
    let bestScore: number = Infinity; // The score for a move.

    for (let i: number = 0; i < this.board.length; i++) {
      if (this.board[i] === '') {
        this.board[i] = this.aiPlay;
        let s: number = this.minimax(0 , true);
        this.board[i] = '';
        if (s < bestScore) {
          bestScore = s;
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
                });
              }) ? 10
            : this.winningComb.some(
              (combination): boolean => {
                return combination.every((i): boolean => {
                  return this.board[i] === 'circle';
                });
              }) ? -10
            : this.board.every(
              c => c === 'x' || c === 'circle'
            ) ? 0 : NaN;
  }

  private minimax(depth: number, isMaximizing: boolean): number {
    let score: number = this.checkWin();

    if (!Number.isNaN(Number(score))) {
      return score;
    }

    if (isMaximizing) { // X turn
      let best: number = -1000;
      for (let i: number = 0; i < this.board.length; i++) {
        if (this.board[i] === '') {
          this.board[i] = this.human;
          let s: number = this.minimax(depth + 1, !isMaximizing);
          this.board[i] = '';
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
          best = Math.min(s, best);
        }
      }
      return best;
    }
  }


}
