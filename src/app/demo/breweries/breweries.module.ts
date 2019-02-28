import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {BreweriesComponent} from './breweries.component';
import * as Pages from './pages';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '', component: BreweriesComponent, children: [
          {path: 'new', component: Pages.BreweriesEditComponent},
          {path: ':id/edit', component: Pages.BreweriesEditComponent},
          {path: ':id', component: Pages.BreweriesOneComponent},
          {path: '**', component: Pages.BreweriesListComponent}
        ]
      }
    ])
  ],
  declarations: [
    BreweriesComponent,
    Pages.BreweriesEditComponent,
    Pages.BreweriesListComponent,
    Pages.BreweriesOneComponent
  ],
  entryComponents: [BreweriesComponent],
  exports: [RouterModule]
})
export class BreweriesModule {

}
