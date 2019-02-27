import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {NgFluxifyModule} from '../../projects/ngFluxify/src/public_api';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {ClarityModule} from '@clr/angular';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {DemoModule} from './demo/demo.module';
import {AppComponent} from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    DemoModule,
    RouterModule.forRoot([
      {path: '', loadChildren: () => DemoModule}
    ]),
    NgFluxifyModule,
    ClarityModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
  }
}
