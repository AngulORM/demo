import {Entity} from '../../../projects/angulorm/src/lib/decorators/entity.decorator';
import {AbstractRestEntity} from '../../../projects/angulorm/src/lib/domain/entities';
import {IndexedDBEntityDescriptor} from '../descriptors/indexedDB-entity.descriptor';
import {EntityProperty} from '../../../projects/angulorm/src/lib/decorators';
import {PropertyDescriptor} from '../../../projects/angulorm/src/lib/domain/descriptors';

@Entity<IndexedDBEntityDescriptor>(new IndexedDBEntityDescriptor('Test', 'AngulORM-demo', 'Test'))
export class TestEntity extends AbstractRestEntity {
  @EntityProperty(new PropertyDescriptor(String))
  public title: string;

  toString(): string {
    return `${this.id} - ${this.title}`;
  }
}
