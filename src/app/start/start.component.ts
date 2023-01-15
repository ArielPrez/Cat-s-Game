import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Game } from '../models/game';
import { Player } from '../models/player';
import { StringService } from '../service/string.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit, OnChanges {

  @Input() isNew!: boolean;
  @Input() message!: string;
  @Input() game!: Game;

  @Output() newGame: EventEmitter<Game> = new EventEmitter();

  public playerName: string = '';

  constructor(public stringService: StringService) {}

  public ngOnInit(): void {}

  public ngOnChanges(): void {
    if (this.message !== '') {
      this.playerName = this.message;
      if (this.message !== 'draw') {
        this.message = "~ " +
                        (this.message === "circle" ? "O's" : "X's") +
                       " Wins! ~";
      } else {
        this.message = "It's Draw!";
      }
    }
  }

  public startGame(choice: string): void {
    const p: Player = new Player().load({name: this.playerName, choice: choice});
    this.game.board = ['','','','','','','','',''];
    this.game.player = new Player().load(p);
    this.message = '';
    this.isNew = false;
    this.game.currentPlay = 'x';
    this.newGame.emit(this.game);
  }

  public resetGame(): void {
    this.isNew = true;
    this.message = '';
    this.playerName = '';

    this.game = new Game();
    this.game.board = ['','','','','','','','',''];
    this.game.player = new Player().load(this.game.player);
  }

}
