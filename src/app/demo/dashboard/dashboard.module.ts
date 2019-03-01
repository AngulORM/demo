import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {DashboardComponent} from './dashboard.component';
import {ClarityModule} from '@clr/angular';
import * as Pipes from './pipes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: DashboardComponent}
    ]),
    ClarityModule,
  ],
  declarations: [
    DashboardComponent,
    Pipes.ObjectByteSizePipe,
    Pipes.OrderbyPipe,
    Pipes.ReadableBytecountPipe
  ],
  entryComponents: [DashboardComponent],
  exports: [RouterModule]
})
export class DashboardModule {

}
