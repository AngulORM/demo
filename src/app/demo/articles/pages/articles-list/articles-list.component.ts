import {Component, ViewChild} from '@angular/core';

import {ArticleEntity} from '../../entities';

@Component({
  selector: 'ngf-demo-page-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.scss']
})
export class ArticlesListComponent {
  @ViewChild('deleteModal') deleteModal;

  public articles = ArticleEntity.readAll<ArticleEntity>();
  public articleToDelete: ArticleEntity;

  async onDelete(article: ArticleEntity, confirm = false) {
    if (confirm) {
      try {
        await this.articleToDelete.delete();
        delete this.articleToDelete;
        this.deleteModal.close();
      } catch (e) {

      }
    } else {
      this.articleToDelete = article;
      this.deleteModal.open();
    }
  }
}
