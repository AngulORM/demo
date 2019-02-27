import {IEntityService} from '../../../../projects/ngFluxify/src/lib/services';
import {AbstractEntity} from '../../../../projects/ngFluxify/src/lib/domain/entities';
import {IndexedDBEntityDescriptor} from '../descriptors';

export class IndexedDBEntityService<T extends AbstractEntity> implements IEntityService<T> {
  private static databases: Map<string, IDBDatabase> = new Map<string, IDBDatabase>();
  private static upgradesNeeded: Map<string, boolean> = new Map<string, boolean>();

  constructor(private entityDescriptor: IndexedDBEntityDescriptor) {

  }

  private static get indexedDB(): IDBFactory {
    return window.indexedDB;
  }

  private static async getDatabase(name: string): Promise<IDBDatabase> {
    if (IndexedDBEntityService.databases.has(name)) {
      return IndexedDBEntityService.databases.get(name);
    }

    return new Promise<IDBDatabase>((resolve, reject) => {
      const request = IndexedDBEntityService.indexedDB.open(name);
      request.onerror = (event) => {
        reject(event);
      };

      request.onsuccess = (event) => {
        IndexedDBEntityService.databases.set(name, event.target['result']);
        resolve(IndexedDBEntityService.databases.get(name));
      };

      request.onupgradeneeded = (event) => {
        IndexedDBEntityService.upgradesNeeded.set(name, true);
        IndexedDBEntityService.databases.set(name, event.target['result']);
        resolve(IndexedDBEntityService.databases.get(name));
      };
    });
  }

  public read(id: number) {
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
      delete sanitizedEntity.id;

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
        this.read(entity.id).then(data => resolve(data)).catch(error => reject(error));
      };
    });
  }

  public async delete(id: number): Promise<any> {
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
      const database = await IndexedDBEntityService.getDatabase(this.entityDescriptor.database);

      if (IndexedDBEntityService.upgradesNeeded.get(this.entityDescriptor.database)) {
        const store = database.createObjectStore(this.entityDescriptor.table, {keyPath: 'id', autoIncrement: true});
        store.transaction.oncomplete = () => {
          resolve(database.transaction(this.entityDescriptor.table, 'readwrite').objectStore(this.entityDescriptor.table));
        };
      } else {
        resolve(database.transaction(this.entityDescriptor.table, 'readwrite').objectStore(this.entityDescriptor.table));
      }
    });
  }
}
