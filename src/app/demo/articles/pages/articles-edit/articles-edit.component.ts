import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ClrForm} from '@clr/angular';
import {ArticleEntity} from '../../../../core/entities';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {take} from 'rxjs/operators';

@Component({
  selector: 'ngf-demo-page-articles-edit',
  templateUrl: './articles-edit.component.html',
  styleUrls: ['./articles-edit.component.scss']
})
export class ArticlesEditComponent implements OnInit, OnDestroy {
  @ViewChild('deleteModal') deleteModal;
  @ViewChild(ClrForm) clrForm;

  public article: ArticleEntity;
  public errorMessage: string;
  public articleForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    content: new FormControl('', Validators.required)
  });

  private routeSub: Subscription;

  constructor(private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(async params => {
      if (params['id']) {
        this.article = <ArticleEntity>await ArticleEntity.read(+params['id']).pipe(take(1)).toPromise();
      } else {
        this.article = new ArticleEntity();
      }

      this.articleForm.controls.title.setValue(this.article.title);
      this.articleForm.controls.content.setValue(this.article.content);
    });
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  async submit() {
    if (this.articleForm.invalid) {
      this.clrForm.markAsDirty();
    } else {
      this.article.title = this.articleForm.controls.title.value;
      this.article.content = this.articleForm.controls.content.value;
      this.article.updatedAt = new Date();

      try {
        await this.article.save();
        this.router.navigateByUrl('/articles');
      } catch (e) {
        this.errorMessage = e.message;
      }
    }
  }

  async onDelete(confirm = false) {
    if (confirm) {
      try {
        await this.article.delete();
        this.deleteModal.close();
        this.router.navigateByUrl('/articles');
      } catch (e) {

      }
    } else {
      this.deleteModal.open();
    }
  }
}
