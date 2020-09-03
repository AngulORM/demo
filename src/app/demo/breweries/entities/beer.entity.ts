import {Observable} from 'rxjs';
import {Entity, EntityProperty, AbstractEntity} from '../../../../../projects/ngFluxify/src/public_api';
import {IndexedDBEntityDescriptor} from '../../../core';
import {BreweryEntity} from './brewery.entity';

@Entity(new IndexedDBEntityDescriptor<BeerEntity>({
  name: 'Beer',
  database: 'NgFluxify-demo',
  table: 'Beer'
}))
export class BeerEntity extends AbstractEntity {
  @EntityProperty({type: Number, primary: true})
  public id: number;

  @EntityProperty({type: String})
  public name: string;

  @EntityProperty({type: String})
  public style: string;

  @EntityProperty({type: Date})
  public createdAt: Date = new Date();

  @EntityProperty({type: Number})
  public rating: number;

  @EntityProperty({type: String})
  public comment: string;

  @EntityProperty({type: Number})
  public idBrewery: number;

  private _brewery: Observable<BreweryEntity>;

  public get brewery(): Observable<BreweryEntity> {
    if (!this._brewery) {
      this._brewery = BreweryEntity.read<BreweryEntity>(this.idBrewery);
    }

    return this._brewery;
  }
}
