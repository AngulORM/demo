import {Component} from '@angular/core';
import {BreweryEntity} from '../../../entities/brewery.entity';

@Component({
  selector: 'ard-breweries',
  templateUrl: './breweries.component.html',
  styleUrls: ['./breweries.component.css']
})
export class BreweriesComponent {
  breweries = BreweryEntity.readAll();
}
