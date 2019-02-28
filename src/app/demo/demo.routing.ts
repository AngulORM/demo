import {Routes} from '@angular/router';

export const demoRoutes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path: 'home', loadChildren: './dashboard/dashboard.module#DashboardModule'},
  {path: 'breweries', loadChildren: './breweries/breweries.module#BreweriesModule'},
  {path: 'articles', loadChildren: './articles/articles.module#ArticlesModule'},
  {path: '**', redirectTo: ''}
];
