import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { MindVideoPlayerComponent } from './mind-video-player/mind-video-player.component';
import { MindImageFilterComponent } from './mind-image-filter/mind-image-filter.component';
import { BlinkComponent } from './blink/blink.component';

const appRoutes: Routes = [
  {
    path: 'video/:metricName/:videoName',
    component: MindVideoPlayerComponent,
  },
  {
    path: 'image/:metricName/:imageName',
    component: MindImageFilterComponent,
  },
  { path: '',
    redirectTo: 'video/attention/beer',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    MindVideoPlayerComponent,
    MindImageFilterComponent,
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
