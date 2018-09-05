import {Component, OnInit} from '@angular/core';
import {TestEntity} from '../entities/test.entity';
import {SecondEntity} from '../entities/second.entity';
import {AngularRestModule} from '../../projects/angulorm/src/lib/angular-rest.module';

@Component({
  selector: 'ard-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'AngulORM demo';

  entities = AngularRestModule.entities;

  constructor() {
    const entity2 = new SecondEntity();

    setInterval(() => {
      this.entities = AngularRestModule.entities;
    }, 100);
  }

  async ngOnInit() {
    const entity = await TestEntity.read(1).toPromise();
  }
}
