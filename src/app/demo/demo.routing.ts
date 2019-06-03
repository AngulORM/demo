import {Routes} from '@angular/router';

export const demoRoutes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path: 'home', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)},
  {path: 'breweries', loadChildren: () => import('./breweries/breweries.module').then(m => m.BreweriesModule)},
  {path: 'articles', loadChildren: () => import('./articles/articles.module').then(m => m.ArticlesModule)},
  {path: '**', redirectTo: ''}
];
