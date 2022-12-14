import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  @Input() isNew!: boolean;
  @Input() aiIndex!: number;
  @Output() message: EventEmitter<string> = new EventEmitter();
  @Output() updateBoard: EventEmitter<Array<string>> = new EventEmitter();
  @Output() updatePlay: EventEmitter<string> = new EventEmitter();

  private cross: string = 'x'
  private circle: string = 'circle'
  private winningComb: number[][] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  public currentPlay: string = ''

  public cells: string[] = ['','','','','','','','',''];

  private isCircle: boolean = false;

  constructor() { }

  public ngOnInit(): void {
    this.currentPlay = 'x';
  }

  public handleClick(index: number): void {
    setTimeout((): void => {
      if (!Number.isNaN(Number(index)) && !this.checkWin()) {
        this.cells[index] = this.currentPlay;
        if (this.checkWin()) {
          this.endGame(false);
        } else if(this.isDraw()) {
          this.endGame(true);
        } else {
          this.isCircle = !this.isCircle;
          this.currentPlay = this.isCircle ? this.circle : this.cross;
        }
        this.updateBoard.emit(this.cells);
        this.updatePlay.emit(this.currentPlay);
        this.aiIndex = NaN;
      }
    });

  }

  private checkWin(): boolean {
    return this.winningComb.some(
      (combination): boolean => {
        return combination.every((i): boolean => {
          return this.cells[i] === this.currentPlay;
        })
      });
  }

  private endGame(draw: boolean): void {
    this.currentPlay = 'x';
    if (draw) {
      this.message.emit("It's Draw!");
    } else {
      this.message.emit((this.isCircle? "O's" : "X's") + "Wins!");
    }
    setTimeout((): void => {
      this.isNew = false;
      this.cells = ['','','','','','','','',''];
      this.isCircle = false;
    }, 0);
  }

  private isDraw(): boolean {
    return this.cells.every(
      c => c === 'x' || c === 'circle'
    );
  }

  public isReady(): boolean {
    let toReturn: boolean = false;
    if (this.isNew) {
      toReturn = true;
    } else {
      return Number.isNaN(Number(this.aiIndex));
    }

    return toReturn;
  }

  public getMessage(): string {
    let toReturn: string = 'Your turn!';
    return toReturn;
  }

}
