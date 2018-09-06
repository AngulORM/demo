import {Entity} from '../../projects/angulorm/src/lib/decorators/entity.decorator';
import {IndexedDBEntityDescriptor} from '../descriptors/indexedDB-entity.descriptor';

@Entity<IndexedDBEntityDescriptor>(new IndexedDBEntityDescriptor('Second', 'AngulORM-demo', 'Second'))
export class SecondEntity {
}
