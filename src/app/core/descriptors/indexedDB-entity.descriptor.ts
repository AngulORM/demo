import {EntityDescriptor, EntityDescriptorAttributes} from '../../../../projects/ngFluxify/src/lib/domain/descriptors';
import {DumbReducer} from '../../../../projects/ngFluxify/src/lib/stores/reducers';
import {IndexedDBEntityService} from '../services';

export class IndexedDBEntityDescriptor extends EntityDescriptor {
  readonly reducerType: any = DumbReducer;
  readonly serviceType: any = IndexedDBEntityService;
  database: string;
  table: string;

  constructor(attributes: IndexedDBEntityDescriptorAttributes) {
    super(attributes);

    this.database = attributes.database;
    this.table = attributes.table;
  }
}

export interface IndexedDBEntityDescriptorAttributes extends EntityDescriptorAttributes {
  database: string;
  table: string;
}
