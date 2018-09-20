import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AngularRestModule} from '../../projects/angulorm/src/public_api';
import {BreweriesComponent, DashboardComponent, NavbarComponent} from './components';
import {LayoutModule} from '@angular/cdk/layout';
import {MatButtonModule, MatCardModule, MatChipsModule, MatGridListModule, MatIconModule, MatListModule, MatMenuModule, MatSidenavModule, MatToolbarModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';

const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'breweries', component: BreweriesComponent},
];


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    BreweriesComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    AngularRestModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatChipsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
  }
}
