import {Entity} from '../../projects/angulorm/src/lib/decorators/entity.decorator';
import {AbstractRestEntity} from '../../projects/angulorm/src/lib/domain/entities';
import {RestEntityDescriptor} from '../../projects/angulorm/src/lib/domain/descriptors';

@Entity<RestEntityDescriptor>(new RestEntityDescriptor('Brewery', 'https://api.openbrewerydb.org/breweries'))
export class BreweryEntity extends AbstractRestEntity {
  constructor(
    public name: string = null,
    public brewery_type: string = null,
    public street: string = null,
    public city: string = null,
    public state: string = null,
    public postal_code: string = null,
    public country: string = null,
    public longitude: string = null,
    public latitude: string = null,
    public phone: string = null,
    public website_url: string = null,
    public updated_at: string = null,
  ) {
    super();
  }
}
