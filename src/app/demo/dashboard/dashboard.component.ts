import {Component} from '@angular/core';
import {NgFluxifyModule} from '../../../../projects/ngFluxify/src/public_api';

@Component({
  selector: 'ngf-demo-page-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  constructor(public ngFluxify: NgFluxifyModule) {

  }
}
