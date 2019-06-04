import {Component} from '@angular/core';
import {BeerEntity} from '../../entities';
import {Observable} from 'rxjs';

@Component({
  selector: 'ngf-demo-page-beers-list',
  templateUrl: './beers-list.component.html',
  styleUrls: ['./beers-list.component.scss']
})
export class BeersListComponent {
  public beers: Observable<BeerEntity[]> = BeerEntity.readAll<BeerEntity>();
}
