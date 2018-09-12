import {Component, OnInit} from '@angular/core';
import {TestEntity} from '../entities/test.entity';
import {SecondEntity} from '../entities/second.entity';
import {AngularRestModule} from '../../projects/angulorm/src/lib/angular-rest.module';
import {Observable} from 'rxjs';
import {AbstractEntity} from '../../projects/angulorm/src/lib/domain/entities';
import {take} from 'rxjs/operators';

@Component({
  selector: 'ard-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'AngulORM demo';

  entities = AngularRestModule.entities;
  testEntities: Observable<TestEntity[]>;

  constructor() {
    const entity2 = new SecondEntity();

    setInterval(() => {
      this.entities = AngularRestModule.entities;
    }, 3000);
  }

  async ngOnInit() {
    const entity = new TestEntity();
    entity.title = 'Hello world';
    entity.save()
      .then(async (observable: Observable<TestEntity>) => console.log('Created : ' + (await observable.pipe(take(1)).toPromise()).toString()))
      .catch(error => console.log('An error occured', error));

    this.testEntities = <Observable<TestEntity[]>>TestEntity.readAll();
    this.testEntities.subscribe(entities => console.log('Number of TestEntities : ' + entities.length));
  }

  delete(entity: AbstractEntity) {
    entity.delete()
      .then(id => console.log('Deleted : ' + id))
      .catch(error => console.log('An error occured', error));
  }
}
