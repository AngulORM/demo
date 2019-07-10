import {RestEntityDescriptor, RestEntityDescriptorAttributes} from '../../../../projects/ngFluxify/src/lib/domain/descriptors';
import {ExtendedRestReducer} from '../reducers';
import {ExtendedRestService} from '../services';

export class ExtendedRestEntityDescriptor extends RestEntityDescriptor {
  readonly reducerType: any = ExtendedRestReducer;
  readonly serviceType: any = ExtendedRestService;

  constructor(attributes: RestEntityDescriptorAttributes) {
    super(attributes);
  }
}
