import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  // @ViewChild('board') board!: ElementRef<HTMLDivElement>;
  @Input() isNew!: boolean;
  @Output() message: EventEmitter<string> = new EventEmitter();

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

  public currentClass: string = 'x'
  // public currentIndex: number = 0;

  public cells: string[] = ['','','','','','','','',''];

  private isCircle: boolean = true;

  constructor() { }

  public ngOnInit(): void {
    // this.startGame();

    // this.setBoardHoverClass();
    // this.winningMessageElement.classList.remove('show');
  }

  private startGame(): void {

    // this.dataCell?.nativeElement.querySelectorAll('[dataCell]').forEach(
    //   (c): void => {
    //     c.nativeElement.classList.remove(this.cross);
    //     c.nativeElement.classList.remove(this.circle);
    //     c.nativeElement.removeEventListener('click', (e: MouseEvent): void => this.handleClick(e));
    //     c.nativeElement.addEventListener('click', (e: MouseEvent): void => this.handleClick(e), { once: true });
    //   }
    // );

  }

  public handleClick(index: number): void {
    if (this.currentClass === '') {
      this.currentClass = 'x';
    }
    this.cells[index] = this.currentClass;
    if (this.checkWin()) {
      this.endGame(false);
    } else if(this.isDraw()) {
      this.endGame(true);
    } else {
      this.currentClass = this.isCircle ? this.circle : this.cross;
      this.isCircle = !this.isCircle;
      // this.setBoardHoverClass();
    }

  }

  private checkWin(): boolean {
    return this.winningComb.some(
      (combination): boolean => {
        return combination.every((i): boolean => {
          return this.cells[i] === this.currentClass;
        })
      });
  }

  private endGame(draw: boolean): void {
    this.currentClass = '';
    this.cells = ['','','','','','','','',''];
    if (draw) {
      this.message.emit("It's Draw!");
    } else {
      this.message.emit((this.isCircle? "X's" : "O's") + "Wins!");
    }
  }

  private isDraw(): boolean {
    return this.cells.every(
      c => c === 'x' || c === 'circle'
    );
  }

  // private setBoardHoverClass(): void {
  //   this.board?.nativeElement.classList.remove(this.cross);
  //   this.board?.nativeElement.classList.remove(this.circle);
  //   if (this.isCircle) {
  //     this.board?.nativeElement.classList.add(this.circle);
  //   } else {
  //     this.board?.nativeElement.classList.add(this.cross);
  //   }
  // }


}
