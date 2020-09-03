import {AnyAction} from 'redux';
import {Map} from 'immutable';
import {
  NgFluxifyConfig,
  AbstractEntity,
  DumbReducer,
  EntityDescriptor,
  ErrorAction,
  RequestAction,
  ResponseAction
} from "../../../../projects/ngFluxify/src/public_api";
import {AbstractExtendedRestEntity} from '../entities';

export class ExtendedRestReducer<T extends AbstractEntity> extends DumbReducer<T> {
  static readonly ACTION_SEARCH = ['SEARCH'];

  constructor(entityDescriptor: EntityDescriptor<AbstractExtendedRestEntity>, ngFluxifyConfig: NgFluxifyConfig) {
    super(entityDescriptor, ngFluxifyConfig);

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
