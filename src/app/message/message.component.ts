import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Player } from '../models/player';

interface StartGame {
  player: Player,
  isNew: boolean
}
@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit, OnChanges {

  @Input() isNew!: boolean;
  @Input() message!: string;

  @Output() player: EventEmitter<StartGame> = new EventEmitter();
  @Output() restart: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  public ngOnInit(): void {}

  public ngOnChanges(): void {
    if (this.message !== '') {
      if (this.message !== 'draw') {
        this.message = (this.message === 'circle' ? "O's" : "X's") + "Wins!";
      } else {
        this.message = "It's Draw!";
      }
    }
  }

  public startGame(name: string, choice: string): void {
    this.message = '';
    const p: Player = new Player().load({name: name, choice: choice});
    const obj: StartGame = {
      player: p,
      isNew: true
    }
    this.isNew = false;
    this.player.emit(obj);
    this.restart.emit(true);
  }

}
