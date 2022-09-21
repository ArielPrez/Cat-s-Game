import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit, OnChanges {

  @Input() message!: string;

  @Output() restart: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  public ngOnInit(): void {}

  public ngOnChanges(): void {
    if (this.message !== '') {
      // console.log(this.message);
    }
  }

}
