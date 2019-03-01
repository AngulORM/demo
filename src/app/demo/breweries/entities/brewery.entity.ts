import {Observable} from 'rxjs';

import {AbstractRestEntity} from '../../../../../projects/ngFluxify/src/lib/domain/entities';
import {environment} from '../../../../environments/environment';
import {ExtendedRestEntityDescriptor} from '../../../core/descriptors';
import {AbstractExtendedRestEntity} from '../../../core/entities';
import {Entity, EntityProperty} from '../../../../../projects/ngFluxify/src/lib/decorators';

@Entity(new ExtendedRestEntityDescriptor('Brewery', environment.breweriesAPIUrl))
export class BreweryEntity extends AbstractExtendedRestEntity {
  @EntityProperty({type: String})
  public name: string;

  @EntityProperty({type: String})
  public brewery_type: string;

  @EntityProperty({type: String})
  public street: string;

  @EntityProperty({type: String})
  public city: string;

  @EntityProperty({type: String})
  public state: string;

  @EntityProperty({type: String})
  public postal_code: string;

  @EntityProperty({type: String})
  public country: string;

  @EntityProperty({type: String})
  public longitude: string;

  @EntityProperty({type: String})
  public latitude: string;

  @EntityProperty({type: String})
  public phone: string;

  @EntityProperty({type: String})
  public website_url: string;

  @EntityProperty({type: Date})
  public updated_at: Date;

  public static search(filters: Map<string, string>): Observable<AbstractRestEntity[]> {
    const params = new Map<string, string>();
    if (filters.has('state')) {
      params.set('by_state', filters.get('state'));
    }
    if (filters.has('name')) {
      params.set('by_name', filters.get('name'));
    }

    if (params.size === 0) {
      throw new Error('At least one filter is required');
    }

    return super.search(params);
  }
}