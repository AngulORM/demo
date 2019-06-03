import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {BreweriesComponent} from './breweries.component';
import * as Pages from './pages';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ClarityModule} from '@clr/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ClarityModule,
    RouterModule.forChild([
      {
        path: '', component: BreweriesComponent, children: [
          {path: 'beers', component: Pages.BeersListComponent},
          {path: ':brewery/beers/new', component: Pages.BeersEditComponent},
          {path: 'beers/:id/edit', component: Pages.BeersEditComponent},
          {path: 'beers/:id', component: Pages.BeersOneComponent},
          {path: 'all', component: Pages.BreweriesListComponent},
          {path: ':id', component: Pages.BreweriesOneComponent},
          {path: '**', redirectTo: 'all'}
        ]
      }
    ])
  ],
  declarations: [
    BreweriesComponent,
    Pages.BeersEditComponent,
    Pages.BeersListComponent,
    Pages.BeersOneComponent,
    Pages.BreweriesListComponent,
    Pages.BreweriesOneComponent
  ],
  entryComponents: [BreweriesComponent],
  exports: [RouterModule]
})
export class BreweriesModule {

}
