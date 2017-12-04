import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MindVideoPlayerComponent } from './mind-video-player/mind-video-player.component';
import { BlinkComponent } from './blink/blink.component';

@NgModule({
  declarations: [
    AppComponent,
    MindVideoPlayerComponent,
    BlinkComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
