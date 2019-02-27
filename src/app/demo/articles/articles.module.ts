import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ClarityModule} from '@clr/angular';

import {ArticlesComponent} from './articles.component';
import * as Pages from './pages';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ClarityModule,
    RouterModule.forChild([
      {
        path: 'articles', component: ArticlesComponent, children: [
          {path: 'all', component: Pages.ArticlesListComponent},
          {path: 'new', component: Pages.ArticlesEditComponent},
          {path: ':id/edit', component: Pages.ArticlesEditComponent},
          {path: ':id', component: Pages.ArticlesOneComponent},
          {path: '**', redirectTo: 'all'}
        ]
      }
    ])
  ],
  declarations: [
    ArticlesComponent,
    Pages.ArticlesEditComponent,
    Pages.ArticlesListComponent,
    Pages.ArticlesOneComponent
  ],
  entryComponents: [ArticlesComponent],
  exports: [RouterModule]
})
export class ArticlesModule {

}
