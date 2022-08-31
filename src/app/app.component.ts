import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public gameResult: string = '';
  public reset: boolean = false;

  public setMessage(message: string): void {
    this.gameResult = message;
  }

  public resetGame(reset: boolean): void {
    this.reset = reset;
  }
}
