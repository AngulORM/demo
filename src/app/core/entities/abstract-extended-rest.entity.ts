import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {filter, map, mergeMap} from 'rxjs/operators';
import {Map as ImmutableMap} from 'immutable';
import {EntityManager, TransactionState, AbstractRestEntity} from '../../../../projects/ngFluxify/src/public_api';
import {ExtendedRestService} from '../services';
import {ExtendedRestReducer} from '../reducers';

// @ts-ignore
export abstract class AbstractExtendedRestEntity extends AbstractRestEntity {
  public static entityManager: EntityManager<AbstractExtendedRestEntity>;
  public static entityService: ExtendedRestService<AbstractExtendedRestEntity>;

  public static search(filters: Map<string, string>): Observable<AbstractRestEntity[]> {
    const subject: BehaviorSubject<AbstractExtendedRestEntity[]> = new BehaviorSubject([]);

    this.entityManager.call(ExtendedRestReducer.ACTION_SEARCH, this.entityService.search, filters)
      .pipe(filter(transaction => [TransactionState.finished, TransactionState.error].indexOf(transaction.state) !== -1))
      .pipe<AbstractRestEntity[]>(mergeMap((transaction: TransactionState) => {
        if (transaction.state === TransactionState.error) {
          throwError(transaction.error);
        }
        return this.entityManager.ngRedux.select<ImmutableMap<any, AbstractRestEntity>>([this.entityManager.entityDescriptor.name, 'entities'])
          .pipe(map(entities => entities.toArray()))
          .pipe(map(entities => entities.filter(entity => transaction.entities.indexOf(entity.primary) !== -1)));
      })).subscribe(
      next => subject.next(next),
      error => subject.error(error),
      () => subject.complete()
    );

    return subject.asObservable();
  }
}
