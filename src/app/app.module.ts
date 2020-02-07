import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ClarityModule} from '@clr/angular';

import {NgFluxifyModule} from '../../projects/ngFluxify/src/public_api';

import {AppComponent} from './app.component';
import {environment} from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: '', loadChildren: () => import('./demo/demo.module').then(m => m.DemoModule)}
    ]),
    NgFluxifyModule.initialize({enableStoreLogger: !environment.production}),
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
