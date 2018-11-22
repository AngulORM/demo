import {AbstractRestEntity} from '../../../projects/angulorm/src/lib/domain/entities';
import {EntityManager, TransactionState} from '../../../projects/angulorm/src/lib/domain/api';
import {ExtendedRestService} from '../services';
import {ExtendedRestReducer} from '../reducers';
import {Observable, throwError} from 'rxjs';
import {filter, map, mergeMap} from 'rxjs/operators';
import {Map as ImmutableMap} from 'immutable';

export abstract class AbstractExtendedRestEntity extends AbstractRestEntity {
  public static entityManager: EntityManager<AbstractExtendedRestEntity>;
  public static entityService: ExtendedRestService<AbstractExtendedRestEntity>;

  public static search(filters: Map<string, string>): Observable<AbstractRestEntity[]> {
    return this.entityManager.call(ExtendedRestReducer.ACTION_SEARCH, this.entityService.search, filters)
      .pipe(filter(transaction => [TransactionState.finished, TransactionState.error].indexOf(transaction.state) !== -1))
      .pipe<AbstractRestEntity[]>(mergeMap((transaction: TransactionState) => {
        if (transaction.state === TransactionState.error) {
          throwError(transaction.error);
        }

        return EntityManager.ngRedux.select<ImmutableMap<number, AbstractRestEntity>>([this.entityManager.entityDescriptor.name, 'entities'])
          .pipe(map(entities => entities.toArray()))
          .pipe(map(entities => entities.filter(entity => transaction.entities.indexOf(entity.id) !== -1)));
      }));
  }
}
