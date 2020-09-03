import {Entity, EntityProperty, AbstractEntity} from '../../../../../projects/ngFluxify/src/public_api';
import {IndexedDBEntityDescriptor} from '../../../core';

@Entity(new IndexedDBEntityDescriptor<TagEntity>({
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
