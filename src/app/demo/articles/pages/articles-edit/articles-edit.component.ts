import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ClrForm} from '@clr/angular';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {take} from 'rxjs/operators';

import {ArticleEntity, TagEntity} from '../../entities';

@Component({
  selector: 'ngf-demo-page-articles-edit',
  templateUrl: './articles-edit.component.html',
  styleUrls: ['./articles-edit.component.scss']
})
export class ArticlesEditComponent implements OnInit, OnDestroy {
  @ViewChild('deleteModal') deleteModal;
  @ViewChild(ClrForm) clrForm;

  public article: ArticleEntity;
  public tags: Observable<TagEntity[]> = TagEntity.readAll<TagEntity>();
  public errorMessage: string;
  public articleForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    content: new FormControl('', Validators.required),
    tags: new FormControl([]),
    newTagText: new FormControl('')
  });

  private routeSub: Subscription;

  constructor(private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(async params => {
      if (params['id']) {
        this.article = await ArticleEntity.read<ArticleEntity>(+params['id']).pipe(take(1)).toPromise();
      } else {
        this.article = new ArticleEntity();
      }

      const tags = (await this.article.tags.pipe(take(1)).toPromise()).reduce((acc, tag) => acc.concat([tag.id]), []);

      this.articleForm.controls.title.setValue(this.article.title);
      this.articleForm.controls.content.setValue(this.article.content);
      this.articleForm.controls.tags.setValue(tags);
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
        const article = await (await this.article.save<ArticleEntity>()).pipe(take(1)).toPromise();
        article.removeTags();
        this.articleForm.controls.tags.value.forEach(idTag => {
          article.addTag(idTag);
        });

        this.router.navigate(['/articles', article.id]);
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

  async addTag() {
    if (this.articleForm.controls.newTagText.value && this.articleForm.controls.newTagText.value.trim().length) {
      const tagText = this.articleForm.controls.newTagText.value.trim();

      const tags = await this.tags.pipe(take(1)).toPromise();
      let tag = tags.find(element => element.text.toLowerCase() === tagText.toLowerCase());
      if (!tag) {
        const newTag = new TagEntity();
        newTag.text = tagText;
        tag = await (await newTag.save<TagEntity>()).pipe(take(1)).toPromise();
      }

      this.articleForm.controls.tags.setValue([tag.id].concat(this.articleForm.controls.tags.value));
      this.articleForm.controls.newTagText.setValue('');
    } else {
      this.articleForm.controls.newTagText.markAsDirty();
    }
  }
}
