import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {BreweryEntity} from '../../entities';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'ngf-demo-page-breweries-one',
  templateUrl: './breweries-one.component.html',
  styleUrls: ['./breweries-one.component.scss']
})
export class BreweriesOneComponent implements OnInit, OnDestroy {
  public brewery: Observable<BreweryEntity>;

  private routeSub: Subscription;

  constructor(private sanitizer: DomSanitizer, private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      if (params['id']) {
        this.brewery = <Observable<BreweryEntity>>BreweryEntity.read(+params['id']);
      } else {
        this.router.navigateByUrl('/breweries');
      }
    });
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  getSafeMapUrl(brewery: BreweryEntity) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://maps.google.com/maps?width=100%&height=600&hl=en&ie=UTF8&t=&z=14&iwloc=B&output=embed&coord=${brewery.latitude},${brewery.longitude}&q=${brewery.street}+(${brewery.name})`);
  }
}
