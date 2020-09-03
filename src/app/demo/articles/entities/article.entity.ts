import {Observable} from 'rxjs';
import {map, take, withLatestFrom} from 'rxjs/operators';
import {Entity, EntityProperty, AbstractEntity} from '../../../../../projects/ngFluxify/src/public_api';
import {IndexedDBEntityDescriptor} from '../../../core';
import {TagEntity} from './tag.entity';
import {ArticleTagEntity} from './article-tag.entity';

@Entity(new IndexedDBEntityDescriptor<ArticleEntity>({
  name: 'Article',
  database: 'NgFluxify-demo',
  table: 'Article'
}))
export class ArticleEntity extends AbstractEntity {
  @EntityProperty({type: Number, primary: true})
  public id: number;

  @EntityProperty({type: String})
  public title: string;

  @EntityProperty({type: String})
  public content: string;

  @EntityProperty({type: Date})
  public createdAt: Date = new Date();

  @EntityProperty({type: Date})
  public updatedAt: Date;

  private _tags: Observable<TagEntity[]>;

  public get tags(): Observable<TagEntity[]> {
    if (!this._tags) {
      this._tags = TagEntity
        .readAll<TagEntity>()
        .pipe(withLatestFrom(
          ArticleTagEntity
            .readAll<ArticleTagEntity>()
            .pipe(map((articleTags: ArticleTagEntity[]) => articleTags.filter(articleTag => articleTag.idArticle === this.primary))),
          (tags: TagEntity[], articleTags: ArticleTagEntity[]) => tags.filter(tag => articleTags.some(articleTag => articleTag.idTag === tag.primary)))
        );
    }

    return this._tags;
  }

  public addTag(tag: number | TagEntity): Promise<Observable<ArticleTagEntity>> {
    const articleTag = new ArticleTagEntity();
    articleTag.idArticle = this.id;
    articleTag.idTag = tag instanceof TagEntity ? tag.primary : tag;

    return articleTag.save<ArticleTagEntity>();
  }

  public async removeTags() {
    const articleTags =
      await ArticleTagEntity
        .readAll<ArticleTagEntity>()
        .pipe(map((elements: ArticleTagEntity[]) => elements.filter(articleTag => articleTag.idArticle === this.id)))
        .pipe(take(1))
        .toPromise();

    articleTags.forEach(articleTag => articleTag.delete());
  }
}
