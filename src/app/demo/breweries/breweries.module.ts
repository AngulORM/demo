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
          {path: 'all', component: Pages.BreweriesListComponent},
          {path: ':id', component: Pages.BreweriesOneComponent},
          {path: '**', redirectTo: 'all'}
        ]
      }
    ])
  ],
  declarations: [
    BreweriesComponent,
    Pages.BreweriesListComponent,
    Pages.BreweriesOneComponent
  ],
  entryComponents: [BreweriesComponent],
  exports: [RouterModule]
})
export class BreweriesModule {

}
