import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Game } from '../models/game';

@Component({
  selector: 'app-ai-player',
  templateUrl: './ai-player.component.html',
  styleUrls: ['./ai-player.component.scss']
})
export class AiPlayerComponent implements OnInit {

  @Input() game!: Game;
  @Output() aiMove: EventEmitter<number> = new EventEmitter();

  public boardLength: number = 0;
  public aiPlay: string = '';
  public move: number = NaN;
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

    let count: number = 0;

    if (this.aiPlay === this.game.player.choice) {
      this.aiPlay = '';
    }

    if (this.aiPlay === '') {

      if (this.game.player.choice === 'x') {
        this.aiPlay = 'circle';
      } else {
        this.aiPlay = 'x';
      }
    }

    if (this.game.player.choice === 'x' ||
        this.getMarksCount() > 0) {
      count = this.getMarksCount();
    } else {
      count = 1;
    }

    if (count !== this.boardLength &&
        count > 0 &&
        this.game.currentPlay === this.aiPlay) {

      this.boardLength = count;

      setTimeout((): void => { // AI Turn! =>
        this.move = this.bestMove();
        if (!Number.isNaN(Number(this.move))) {
          this.aiMove.emit(this.move);
          this.move = NaN;
          toReturn = true;
        }
      }, 500);
    }

    return toReturn;
  }

  private getMarksCount(): number {
    let toReturn: number = 0;
    this.game.board.forEach(
      (b): void => {
        if (b !== '') {
          toReturn++;
        }
      }
    );
    return toReturn;
  }

  private bestMove(): number {

    let toReturn: number = NaN; // Index in the board of the best posible move;
    let bestScore: number; // The score for a move.

    if (this.aiPlay === 'circle') {
      bestScore = Infinity;
    } else {
      bestScore = -Infinity;
    }

    for (let i: number = 0; i < this.game.board.length; i++) {
      if (this.game.board[i] === '') {
        this.game.board[i] = this.aiPlay;
        // AI has made his first move, next line will check if is the best.
        if (this.aiPlay === 'circle') {
          let s: number = this.minimax(0 , true);
          this.game.board[i] = '';
          if (s < bestScore) {
            bestScore = s;
            toReturn = i;
          }
        } else {
          let s: number = this.minimax(0 , false);
          this.game.board[i] = '';
          if (s > bestScore) {
            bestScore = s;
            toReturn = i;
          }
        }
      }
    }

    return toReturn;

    // To write a random move in the board.
    // let toReturn: number = Math.floor(Math.random() * 9 );
    // if (this.board[toReturn] !== '') {
    //   toReturn = this.bestMove();
    // }
  }

  private checkWin(): number {

    let toReturn: number = NaN;

    let options: string[] = ['x', 'circle'];

    options.forEach((element): void => {
      if (this.winningComb
              .some((combination): boolean => {
                return combination.every((i): boolean => {
                  return this.game.board[i] === element;
                })})) {
        if (element === 'x') {
          toReturn = 10;
        }
        if (element === 'circle') {
          toReturn = -10;
        }
      }
    });

    if (Number.isNaN(Number(toReturn)) &&
        this.game
            .board
            .every(c => c === 'x' || c === 'circle')) {
      toReturn = 0;
    }

    return toReturn;
  }

  private minimax(depth: number, isMaximizing: boolean): number {

    let score: number = this.checkWin();

    if (!Number.isNaN(Number(score))) {
      return score;
    }

    let best: number;
    let choice: string;

    if (isMaximizing) {
      best = -Infinity;
      choice = 'x';
    } else {
      best = Infinity;
      choice = 'circle';
    }

    for (let i: number = 0; i < this.game.board.length; i++) {
      if (this.game.board[i] === '') {
        this.game.board[i] = choice;
        let s: number = this.minimax(depth + 1, !isMaximizing);
        this.game.board[i] = '';
        if (choice === 'x') {
          best = Math.max(s, best);
        } else {
          best = Math.min(s, best);
        }
      }
    }

    return best;
  }

}
