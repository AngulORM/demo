import {Entity} from '../../projects/angulorm/src/lib/decorators/entity.decorator';
import {AbstractRestEntity} from '../../projects/angulorm/src/lib/domain/entities';
import {IndexedDBEntityDescriptor} from '../descriptors/indexedDB-entity.descriptor';

@Entity<IndexedDBEntityDescriptor>(new IndexedDBEntityDescriptor('Test', 'AngulORM-demo', 'Test'))
export class TestEntity extends AbstractRestEntity {
  constructor(public title: string = null) {
    super();
  }
}
