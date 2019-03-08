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
    name: new FormControl('', [Validators.required, Validators.maxLength(100)])
  });

  private routeSub: Subscription;

  constructor(private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(async params => {
      if (params['id']) {
        this.beer = <BeerEntity>await BeerEntity.read(+params['id']).pipe(take(1)).toPromise();
      } else {
        this.beer = new BeerEntity();
      }

      this.beerForm.controls.name.setValue(this.beer.name);
    });
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  async submit() {
    // if (this.articleForm.invalid) {
    //   this.clrForm.markAsDirty();
    // } else {
    //   this.article.title = this.articleForm.controls.title.value;
    //   this.article.content = this.articleForm.controls.content.value;
    //   this.article.updatedAt = new Date();

    //   try {
    //     const article = <ArticleEntity>await (await this.article.save()).pipe(take(1)).toPromise();
    //     article.removeTags();
    //     this.articleForm.controls.tags.value.forEach(idTag => {
    //       article.addTag(idTag);
    //     });

    //     this.router.navigate(['/articles', article.id]);
    //   } catch (e) {
    //     this.errorMessage = e.message;
    //   }
    // }
  }
}
