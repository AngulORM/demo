import {RestService} from '../../../projects/angulorm/src/lib/services';
import {AbstractRestEntity} from '../../../projects/angulorm/src/lib/domain/entities';

export class ExtendedRestService<T extends AbstractRestEntity> extends RestService<T> {
  public search(filters: Map<string, string>): Promise<any> {
    const params = [];
    filters.forEach(((value, key) => params.push(`${key}=${value}`)));

    return this.httpClient.get(`${this.entityDescriptor.route}?${params.join('&')}`).toPromise();
  }
}