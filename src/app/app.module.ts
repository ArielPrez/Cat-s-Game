import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { StartComponent } from './start/start.component';
import { AiPlayerComponent } from './ai-player/ai-player.component';
import { PostCreateComponent } from './post/post-create/post-create.component';

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
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
