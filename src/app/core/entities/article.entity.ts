import {Entity, EntityProperty} from '../../../../projects/ngFluxify/src/lib/decorators';
import {AbstractEntity} from '../../../../projects/ngFluxify/src/lib/domain/entities';
import {IndexedDBEntityDescriptor} from '../descriptors';

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
}
