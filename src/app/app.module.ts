import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { MindVideoPlayerComponent } from './mind-video-player/mind-video-player.component';
import { BlinkComponent } from './blink/blink.component';

const appRoutes: Routes = [
  {
    path: ':metricName/:videoName',
    component: MindVideoPlayerComponent,
  },
  { path: '',
    redirectTo: '/attention/coffee',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    MindVideoPlayerComponent,
    BlinkComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
