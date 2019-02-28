import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {demoRoutes} from './demo.routing';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(demoRoutes)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class DemoModule {

}
