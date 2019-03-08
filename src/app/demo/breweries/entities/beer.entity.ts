import {Entity, EntityProperty} from '../../../../../projects/ngFluxify/src/lib/decorators';
import {IndexedDBEntityDescriptor} from '../../../core/descriptors';
import {AbstractEntity} from '../../../../../projects/ngFluxify/src/lib/domain/entities';
import {Observable} from 'rxjs';
import {BreweryEntity} from './brewery.entity';

@Entity<IndexedDBEntityDescriptor>(new IndexedDBEntityDescriptor('Beer', 'NgFluxify-demo', 'Beer'))
export class BeerEntity extends AbstractEntity {
  @EntityProperty({type: String})
  public name: string;

  @EntityProperty({type: String})
  public style: string;

  @EntityProperty({type: Date})
  public createdAt: Date = new Date();

  @EntityProperty({type: Number})
  public note: number;

  @EntityProperty({type: String})
  public comment: string;

  @EntityProperty({type: Number})
  public idBrewery: number;

  private _brewery: Observable<BreweryEntity>;

  public get brewery(): Observable<BreweryEntity> {
    if (!this._brewery) {
      this._brewery = <Observable<BreweryEntity>>BreweryEntity.read(this.idBrewery);
    }

    return this._brewery;
  }
}
