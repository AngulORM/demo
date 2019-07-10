import {Entity, EntityProperty} from '../../../../../projects/ngFluxify/src/lib/decorators';
import {IndexedDBEntityDescriptor} from '../../../core/descriptors';
import {AbstractEntity} from '../../../../../projects/ngFluxify/src/lib/domain/entities';

@Entity<IndexedDBEntityDescriptor>(new IndexedDBEntityDescriptor({
  name: 'ArticleTag',
  database: 'NgFluxify-demo',
  table: 'Article_Tag'
}))
export class ArticleTagEntity extends AbstractEntity {
  @EntityProperty({type: Number, primary: true})
  public id: number;

  @EntityProperty({type: Number})
  public idArticle: number;

  @EntityProperty({type: Number})
  public idTag: number;
}
