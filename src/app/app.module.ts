import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AiPlayerComponent } from './ai-player/ai-player.component';
import { BoardComponent } from './board/board.component';
import { PostCreateComponent } from './post/post-create/post-create.component';
import { StartComponent } from './start/start.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    StartComponent,
    AiPlayerComponent,
    PostCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
