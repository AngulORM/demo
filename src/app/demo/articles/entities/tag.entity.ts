import {Entity, EntityProperty} from '../../../../../projects/ngFluxify/src/lib/decorators';
import {IndexedDBEntityDescriptor} from '../../../core/descriptors';
import {AbstractEntity} from '../../../../../projects/ngFluxify/src/lib/domain/entities';

@Entity<IndexedDBEntityDescriptor>(new IndexedDBEntityDescriptor({
  name: 'Tag',
  database: 'NgFluxify-demo',
  table: 'Tag'
}))
export class TagEntity extends AbstractEntity {
  @EntityProperty({type: Number, primary: true})
  public id: number;

  @EntityProperty({type: String})
  public text: string;

  @EntityProperty({type: Date})
  public createdAt: Date = new Date();
}
