import {IEntityService} from '../../../../projects/ngFluxify/src/lib/services';
import {AbstractEntity} from '../../../../projects/ngFluxify/src/lib/domain/entities';
import {IndexedDBEntityDescriptor} from '../descriptors';

export class IndexedDBEntityService<T extends AbstractEntity> implements IEntityService<T> {
  private static databases: Map<string, IDBDatabase> = new Map<string, IDBDatabase>();

  constructor(private entityDescriptor: IndexedDBEntityDescriptor<T>) {

  }

  private static get indexedDB(): IDBFactory {
    return window.indexedDB;
  }

  private static getDatabase(name: string, onupgradeneeded: (event) => void, version?: number): Promise<IDBDatabase> {
    return new Promise<IDBDatabase>((resolve, reject) => {
      if (IndexedDBEntityService.databases.has(name)) {
        if (version && version > IndexedDBEntityService.databases.get(name).version) {
          IndexedDBEntityService.databases.get(name).close();
          IndexedDBEntityService.databases.delete(name);
        } else {
          resolve(IndexedDBEntityService.databases.get(name));
        }
      }

      const request = IndexedDBEntityService.indexedDB.open(name, version);
      request.onerror = (event) => {
        reject(event);
      };

      request.onsuccess = (event) => {
        IndexedDBEntityService.databases.set(name, event.target['result']);
        resolve(IndexedDBEntityService.databases.get(name));
      };

      request.onupgradeneeded = onupgradeneeded;
    });
  }

  public read(id: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const store = await this.getObjectStore();
      const request = store.get(id);
      request.onerror = (event) => {
        reject('Can\'t read');
      };
      request.onsuccess = (event) => {
        resolve(request.result);
      };
    });
  }

  public readAll() {
    return new Promise(async (resolve, reject) => {
      const store = await this.getObjectStore();
      const request = store['getAll']();
      request.onerror = (event) => {
        reject('Can\'t read');
      };
      request.onsuccess = (event) => {
        resolve(request.result);
      };
    });
  }

  public async create(entity: T): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const sanitizedEntity = entity.sanitized;
      delete sanitizedEntity[entity.constructor['primaryKey'][0]];

      const store = await this.getObjectStore();
      const request = store.put(sanitizedEntity);
      request.onerror = (event) => {
        reject('Can\'t create');
      };
      request.onsuccess = async (event) => {
        this.read(event.target['result']).then(data => resolve(data)).catch(error => reject(error));
      };
    });
  }

  public async update(entity: T): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const store = await this.getObjectStore();
      const request = store.put(entity.sanitized);
      request.onerror = (event) => {
        reject('Can\'t update');
      };
      request.onsuccess = (event) => {
        this.read(entity.primary).then(data => resolve(data)).catch(error => reject(error));
      };
    });
  }

  public async delete(id: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const store = await this.getObjectStore();
      const request = store.delete(id);
      request.onerror = (event) => {
        reject('Can\'t delete');
      };
      request.onsuccess = (event) => {
        resolve();
      };
    });
  }

  private async getObjectStore(): Promise<IDBObjectStore> {
    return new Promise<IDBObjectStore>(async (resolve) => {
      const createTableStore = (event: IDBVersionChangeEvent) => {
        event.target['result'].createObjectStore(this.entityDescriptor.table, {keyPath: 'id', autoIncrement: true});
      };

      let database = await IndexedDBEntityService.getDatabase(this.entityDescriptor.database, createTableStore);

      if (!database.objectStoreNames.contains(this.entityDescriptor.table)) {
        database = await IndexedDBEntityService.getDatabase(this.entityDescriptor.database, createTableStore, database.version + 1);
      }

      resolve(database.transaction(this.entityDescriptor.table, 'readwrite').objectStore(this.entityDescriptor.table));
    });
  }
}
