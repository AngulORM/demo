import {Entity, EntityProperty} from '../../../projects/angulorm/src/lib/decorators';
import {ExtendedRestEntityDescriptor} from '../descriptors';
import {AbstractExtendedRestEntity} from './abstract-extended-rest.entity';
import {Observable} from 'rxjs';
import {AbstractRestEntity} from '../../../projects/angulorm/src/lib/domain/entities';
import {PropertyDescriptor} from '../../../projects/angulorm/src/lib/domain/descriptors';
import {environment} from '../../environments/environment';

@Entity(new ExtendedRestEntityDescriptor('Brewery', environment.breweriesAPIUrl))
export class BreweryEntity extends AbstractExtendedRestEntity {
  @EntityProperty(new PropertyDescriptor(String))
  public name: string;

  @EntityProperty(new PropertyDescriptor(String))
  public brewery_type: string;

  @EntityProperty(new PropertyDescriptor(String))
  public street: string;

  @EntityProperty(new PropertyDescriptor(String))
  public city: string;

  @EntityProperty(new PropertyDescriptor(String))
  public state: string;

  @EntityProperty(new PropertyDescriptor(String))
  public postal_code: string;

  @EntityProperty(new PropertyDescriptor(String))
  public country: string;

  @EntityProperty(new PropertyDescriptor(String))
  public longitude: string;

  @EntityProperty(new PropertyDescriptor(String))
  public latitude: string;

  @EntityProperty(new PropertyDescriptor(String))
  public phone: string;

  @EntityProperty(new PropertyDescriptor(String))
  public website_url: string;

  @EntityProperty(new PropertyDescriptor(Date))
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
