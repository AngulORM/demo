import {Entity} from '../../../projects/angulorm/src/lib/decorators/entity.decorator';
import {AbstractRestEntity} from '../../../projects/angulorm/src/lib/domain/entities';
import {IndexedDBEntityDescriptor} from '../descriptors/indexedDB-entity.descriptor';
import {EntityProperty} from '../../../projects/angulorm/src/lib/decorators';

@Entity<IndexedDBEntityDescriptor>(new IndexedDBEntityDescriptor('Test', 'AngulORM-demo', 'Test'))
export class TestEntity extends AbstractRestEntity {
  @EntityProperty({type: String})
  public title: string;

  toString(): string {
    return `${this.id} - ${this.title}`;
  }
}
