import {RestEntityDescriptor} from '../../../projects/angulorm/src/lib/domain/descriptors';
import {ExtendedRestReducer} from '../reducers';
import {ExtendedRestService} from '../services';

export class ExtendedRestEntityDescriptor extends RestEntityDescriptor {
  readonly reducerType: any = ExtendedRestReducer;
  readonly serviceType: any = ExtendedRestService;

  constructor(_name: string, _route: string) {
    super(_name, _route);
  }
}
