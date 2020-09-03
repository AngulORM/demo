import {RestEntityDescriptor, RestEntityDescriptorAttributes} from '../../../../projects/ngFluxify/src/public_api';
import {ExtendedRestReducer} from '../reducers';
import {ExtendedRestService} from '../services';
import {AbstractExtendedRestEntity} from '../entities';

export class ExtendedRestEntityDescriptor<T extends AbstractExtendedRestEntity> extends RestEntityDescriptor<T> {
  readonly reducerType: any = ExtendedRestReducer;
  readonly serviceType: any = ExtendedRestService;


  constructor(attributes: RestEntityDescriptorAttributes) {
    super(attributes);
  }
}
