import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Game } from '../models/game';
import { Player } from '../models/player';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, OnChanges {

  @Input() game!: Game;
  @Input() aiIndex!: number;

  @Output() updateBoard: EventEmitter<Array<string>> = new EventEmitter();

  constructor() {}

  public ngOnInit(): void {}

  public ngOnChanges(): void {
    if (this.aiIndex !== undefined &&
        !Number(isNaN(this.aiIndex)) === true) {
      this.handleClick(this.aiIndex);
    }
  }

  public handleClick(index: number): void {
    setTimeout((): void => {
      if (!Number.isNaN(Number(index))) {
        this.game.board[index] = this.game.currentPlay;
        this.aiIndex = NaN;
        this.updateBoard.emit(this.game.board);
      }
    });

  }

  public getMessage(): string {
    let toReturn: string = '';
    if (this.game.currentPlay !== '' &&
        this.game.player.choice && this.game.player.choice !== '') {
      if (this.game.currentPlay === this.game.player.choice) {
        toReturn = 'Your turn!';
      } else {
        toReturn = 'Now I will move!';
      }
    }
    return toReturn;
  }

}
