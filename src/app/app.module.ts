import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AngularRestModule } from 'projects/angular-rest/src/public_api';
import { TestEntity } from '../entities/test.entity';
import { ENTITIES } from '../entities/entities';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AngularRestModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor() {
  }
}
