import {Entity, EntityProperty, AbstractEntity} from '../../../../../projects/ngFluxify/src/public_api';
import {IndexedDBEntityDescriptor} from '../../../core';

@Entity(new IndexedDBEntityDescriptor<ArticleTagEntity>({
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
