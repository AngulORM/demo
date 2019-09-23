import {EntityDescriptor, EntityDescriptorAttributes} from '../../../../projects/ngFluxify/src/lib/domain/descriptors';
import {DumbReducer} from '../../../../projects/ngFluxify/src/lib/stores/reducers';
import {AbstractEntity} from '../../../../projects/ngFluxify/src/lib/domain/entities';
import {IndexedDBEntityService} from '../services';

export class IndexedDBEntityDescriptor<T extends AbstractEntity> extends EntityDescriptor<T> {
  readonly reducerType: any = DumbReducer;
  readonly serviceType: any = IndexedDBEntityService;
  readonly serviceDeps: any[] = [];
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
