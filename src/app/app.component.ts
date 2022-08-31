import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  // @Output() gameResult: EventEmitter<string> = new EventEmitter();

  public gameResult: string = '';

  public setMessage(message: string): void {
    this.gameResult = message;
  }
}
