import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { VolumeControlComponent } from './volume-control/volume-control.component';
import { DrumpadsComponent } from './drumpads/drumpads.component';

@NgModule({
  declarations: [
    AppComponent,
    VolumeControlComponent,
    DrumpadsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
