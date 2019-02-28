import {Component} from '@angular/core';
import {BreweryEntity} from './entities';

@Component({
  selector: 'ngf-demo-page-breweries',
  templateUrl: './breweries.component.html',
  styleUrls: ['./breweries.component.scss']
})
export class BreweriesComponent {
  constructor() {
    const test = new BreweryEntity();
  }
}
