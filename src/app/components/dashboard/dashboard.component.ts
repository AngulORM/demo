import {Component, OnDestroy, OnInit} from '@angular/core';
import {AngularRestModule} from '../../../../projects/angulorm/src/lib/angular-rest.module';
import {Observable} from 'rxjs';
import {TestEntity} from '../../../entities/test.entity';

@Component({
  selector: 'ard-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  entities = AngularRestModule.entities;
  testEntities: Observable<TestEntity[]>;
  newTestEntityTitle: string;
  private intervalId: number;

  constructor() {
    this.testEntities = <Observable<TestEntity[]>>TestEntity.readAll();
    this.testEntities.subscribe(entities => console.log('Number of TestEntities : ' + entities.length));
  }

  async ngOnInit() {
    this.intervalId = setInterval(() => {
      this.entities = AngularRestModule.entities;
    }, 1000);
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  createTestEntity() {
    if (this.newTestEntityTitle) {
      const entity = new TestEntity();
      entity.title = this.newTestEntityTitle;
      entity.save();

      delete this.newTestEntityTitle;
    }
  }
}
