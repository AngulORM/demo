import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ClrForm} from '@clr/angular';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {take} from 'rxjs/operators';
import {BeerEntity} from '../../entities';

@Component({
  selector: 'ngf-demo-page-beers-edit',
  templateUrl: './beers-edit.component.html',
  styleUrls: ['./beers-edit.component.scss']
})
export class BeersEditComponent implements OnInit, OnDestroy {
  @ViewChild(ClrForm) clrForm;

  public beer: BeerEntity;
  public errorMessage: string;
  public beerForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(150)]),
    style: new FormControl('', [Validators.required]),
    comment: new FormControl('', []),
    rating: new FormControl(null, [Validators.min(0), Validators.max(5)]),
  });

  private routeSub: Subscription;

  constructor(private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(async params => {
      if (params['id']) {
        this.beer = await BeerEntity.read<BeerEntity>(+params['id']).pipe(take(1)).toPromise();
      } else {
        if (params['brewery']) {
          this.beer = new BeerEntity();
          this.beer.idBrewery = +params['brewery'];
        } else {
          this.router.navigateByUrl('/breweries');
        }
      }

      this.beerForm.controls.name.setValue(this.beer.name);
      this.beerForm.controls.style.setValue(this.beer.style);
      this.beerForm.controls.comment.setValue(this.beer.comment);
      this.beerForm.controls.rating.setValue(this.beer.rating);
    });
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  async submit() {
    if (this.beerForm.invalid) {
      this.clrForm.markAsDirty();
    } else {
      this.beer.name = this.beerForm.controls.name.value;
      this.beer.style = this.beerForm.controls.style.value;
      this.beer.comment = this.beerForm.controls.comment.value;
      this.beer.rating = this.beerForm.controls.rating.value;

      try {
        await (await this.beer.save()).pipe(take(1)).toPromise();

        this.router.navigate(['/breweries', this.beer.idBrewery]);
      } catch (e) {
        this.errorMessage = e.message;
      }
    }
  }
}
