import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {DashboardComponent} from './dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: DashboardComponent}
    ])
  ],
  declarations: [DashboardComponent],
  entryComponents: [DashboardComponent],
  exports: [RouterModule]
})
export class DashboardModule {

}
