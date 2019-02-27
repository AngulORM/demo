import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {demoRoutes} from './demo.routing';
import {DashboardModule} from './dashboard/dashboard.module';
import {BreweriesModule} from './breweries/breweries.module';
import {ArticlesModule} from './articles/articles.module';

@NgModule({
  imports: [
    CommonModule,
    DashboardModule,
    BreweriesModule,
    ArticlesModule,
    RouterModule.forChild(demoRoutes)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class DemoModule {

}
