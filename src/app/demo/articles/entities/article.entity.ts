import {Entity, EntityProperty} from '../../../../../projects/ngFluxify/src/lib/decorators';
import {IndexedDBEntityDescriptor} from '../../../core/descriptors';
import {AbstractEntity} from '../../../../../projects/ngFluxify/src/lib/domain/entities';
import {Observable} from 'rxjs';
import {TagEntity} from './tag.entity';
import {ArticleTagEntity} from './article-tag.entity';
import {map, withLatestFrom} from 'rxjs/operators';

@Entity<IndexedDBEntityDescriptor>(new IndexedDBEntityDescriptor('Article', 'NgFluxify-demo', 'Article'))
export class ArticleEntity extends AbstractEntity {
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
        .readAll()
        .pipe(withLatestFrom(
          ArticleTagEntity
            .readAll()
            .pipe(map((articleTags: ArticleTagEntity[]) => articleTags.filter(articleTag => articleTag.idArticle === this.id))),
          (tags: TagEntity[], articleTags: ArticleTagEntity[]) => tags.filter(tag => articleTags.some(articleTag => articleTag.idTag === tag.id)))
        );
    }

    return this._tags;
  }
}
