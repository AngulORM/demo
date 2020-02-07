import {AbstractRestEntity} from '../../../../projects/ngFluxify/src/lib/domain/entities';
import {RestService} from '../../../../projects/ngFluxify/src/lib/services/rest-service';

export class ExtendedRestService<T extends AbstractRestEntity> extends RestService<T> {
  public search(filters: Map<string, string>): Promise<any> {
    const params = [];
    filters.forEach(((value, key) => params.push(`${key}=${value}`)));

    return this.httpClient.get(`${this.entityDescriptor.route}?${params.join('&')}`).toPromise();
  }
}
