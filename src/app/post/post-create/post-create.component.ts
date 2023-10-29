import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {

  public enteredValue: string = '';
  public newPost: string = 'Welcome!';

  constructor() { }

  public ngOnInit(): void {
    console.log("Nice!");
  }

  public onAddPost(): void {
    this.newPost += '\n' + this.enteredValue;
    this.enteredValue = '';
  }

}
