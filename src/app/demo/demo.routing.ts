import {Routes} from '@angular/router';

import {DashboardModule} from './dashboard/dashboard.module';
import {BreweriesModule} from './breweries/breweries.module';
import {ArticlesModule} from './articles/articles.module';

export const demoRoutes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', loadChildren: () => DashboardModule},
  {path: 'breweries', loadChildren: () => BreweriesModule},
  {path: 'articles', loadChildren: () => ArticlesModule},
  {path: '**', redirectTo: ''}
];
