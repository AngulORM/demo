import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {BeerEntity} from '../../entities';

@Component({
  selector: 'ngf-demo-page-beers-one',
  templateUrl: './beers-one.component.html',
  styleUrls: ['./beers-one.component.scss']
})
export class BeersOneComponent implements OnInit, OnDestroy {
  public beer: Observable<BeerEntity>;

  private routeSub: Subscription;

  constructor(private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      if (params['id']) {
        this.beer = BeerEntity.read<BeerEntity>(+params['id']);
      } else {
        this.router.navigateByUrl('/breweries/beers');
      }
    });
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }
}
