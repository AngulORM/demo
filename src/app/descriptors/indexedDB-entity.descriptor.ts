import {EntityDescriptor} from '../../../projects/angulorm/src/lib/domain/descriptors';
import {DumbReducer} from '../../../projects/angulorm/src/lib/stores/reducers';
import {IndexedDBEntityService} from '../services/indexedDB-entity.service';

export class IndexedDBEntityDescriptor extends EntityDescriptor {
  readonly reducerType: any = DumbReducer;
  readonly serviceType: any = IndexedDBEntityService;
  database: string;
  table: string;

  constructor(_name: string, _database: string, _table: string) {
    super(_name);
    this.database = _database;
    this.table = _table;
  }
}
