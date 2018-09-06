import {Component, OnInit} from '@angular/core';
import {TestEntity} from '../entities/test.entity';
import {SecondEntity} from '../entities/second.entity';
import {AngularRestModule} from '../../projects/angulorm/src/lib/angular-rest.module';
import {Observable} from 'rxjs';

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
    }, 100);
  }

  async ngOnInit() {
    const entity = new TestEntity();
    entity.title = 'Hello world';
    entity.save();

    this.testEntities = <Observable<TestEntity[]>>TestEntity.readAll();
  }
}
