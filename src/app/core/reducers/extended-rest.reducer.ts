import {AnyAction} from 'redux';
import {Map} from 'immutable';
import {DumbReducer} from '../../../../projects/ngFluxify/src/lib/stores/reducers';
import {AbstractEntity} from '../../../../projects/ngFluxify/src/lib/domain/entities';
import {EntityDescriptor} from '../../../../projects/ngFluxify/src/lib/domain/descriptors';
import {ErrorAction, RequestAction, ResponseAction} from '../../../../projects/ngFluxify/src/lib/stores/actions';

export class ExtendedRestReducer<T extends AbstractEntity> extends DumbReducer<T> {
  static readonly ACTION_SEARCH = ['SEARCH'];

  constructor(entityDescriptor: EntityDescriptor) {
    super(entityDescriptor);

    this.actionsManager.addActionSet(ExtendedRestReducer.ACTION_SEARCH);
  }

  protected handleCustomActions(state: Map<string, any>, action: AnyAction): Map<string, any> {
    switch (action.type) {
      case this.actionsManager.getRequestAction(ExtendedRestReducer.ACTION_SEARCH):
        state = this.startTransaction(<RequestAction>action, state);
        break;
      case this.actionsManager.getErrorAction(ExtendedRestReducer.ACTION_SEARCH):
        state = this.errorTransaction(<ErrorAction>action, state);
        break;
      case this.actionsManager.getResponseAction(ExtendedRestReducer.ACTION_SEARCH):
        const entitiesRead = this.read(action);
        this.setCompleted = false;
        state = this.setEntities(state, entitiesRead);
        state = this.finishTransaction(<ResponseAction>action, state, entitiesRead);
        break;
    }
    return state;
  }
}