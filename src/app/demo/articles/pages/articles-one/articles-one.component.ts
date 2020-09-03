import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';

import {ArticleEntity} from '../../entities';

@Component({
  selector: 'ngf-demo-page-articles-one',
  templateUrl: './articles-one.component.html',
  styleUrls: ['./articles-one.component.scss']
})
export class ArticlesOneComponent implements OnInit, OnDestroy {
  @ViewChild('deleteModal') deleteModal;

  public article: Observable<ArticleEntity>;
  public articleToDelete: ArticleEntity;

  private routeSub: Subscription;

  constructor(private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      if (params['id']) {
        this.article = ArticleEntity.read<ArticleEntity>(+params['id']);
      } else {
        this.router.navigateByUrl('/articles');
      }
    });
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  async onDelete(articleToDelete: ArticleEntity, confirm = false) {
    if (confirm) {
      try {
        await articleToDelete.delete();
        this.deleteModal.close();
        this.router.navigateByUrl('/articles');
      } catch (e) {

      }
    } else {
      this.deleteModal.open();
    }
  }
}
