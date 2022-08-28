import { Component, ElementRef, OnInit, QueryList, ViewChild } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  @ViewChild('board') board: HTMLElement | undefined;
  @ViewChild('dataCell') dataCell!: QueryList<ElementRef>;

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

  public currentClass: string = ''
  public currentIndex: number = NaN;

  public cells: string[] = ['','','','','','','','',''];

  private isCircle: boolean = false;

  constructor() { }

  public ngOnInit(): void {

    this.startGame();

    // this.setBoardHoverClass();
    // this.winningMessageElement.classList.remove('show');
  }

  public startGame(): void {

    // this.dataCell?.nativeElement.querySelectorAll('[dataCell]').forEach(
    //   (c): void => {
    //     c.nativeElement.classList.remove(this.cross);
    //     c.nativeElement.classList.remove(this.circle);
    //     c.nativeElement.removeEventListener('click', (e: MouseEvent): void => this.handleClick(e));
    //     c.nativeElement.addEventListener('click', (e: MouseEvent): void => this.handleClick(e), { once: true });
    //   }
    // );

  }

  public handleClick(e: MouseEvent, index: number): void {
    this.currentIndex = index;
    console.log(e);
    let event: HTMLElement = e.target as HTMLElement;
    const cell: HTMLElement = event;
    this.currentClass = this.isCircle ? this.circle : this.cross;
    this.cells[index] = this.currentClass;
    this.placeMark(cell);
    if (this.checkWin()) {
      this.endGame(false);
    } else if(this.isDraw()) {
      this.endGame(true);
    } else {
      this.isCircle = !this.isCircle;
      this.setBoardHoverClass(cell);
    }
  }

  private placeMark(cell: HTMLElement): void {
    cell.classList.add(this.currentClass);
  }

  private checkWin(): boolean {
    let toReturn: boolean = false;

    return toReturn;
  }

  private endGame(draw: boolean): void {
    if (draw) {
      alert("It's Draw!");
    } else {
      alert(this.isCircle? "0's" : "x's" + "Wins!");

    }
  }

  private isDraw(): boolean {
    return this.cells.every(
      c => c === 'x' || c === 'circle'
    );
  }

  private setBoardHoverClass(cell: HTMLElement): void {
    this.board?.classList.remove(this.cross);
    this.board?.classList.remove(this.circle);
    if (this.isCircle) {
      this.board?.classList.add(this.circle);
    } else {
      this.board?.classList.add(this.cross);
    }
    console.log(this.board);
    console.log(this.cells);
  }

}
