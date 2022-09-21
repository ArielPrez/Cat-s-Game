import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { MessageComponent } from './message/message.component';
import { AiPlayerComponent } from './ai-player/ai-player.component';

@NgModule({
  declarations: [			
    AppComponent,
      BoardComponent,
      MessageComponent,
      AiPlayerComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
