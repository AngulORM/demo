import { Component } from '@angular/core';
import { TestEntity } from '../entities/test.entity';
import { IAppState } from 'projects/angular-rest/src/lib/stores/root.store';
import { AngularRestService } from 'projects/angular-rest/src/public_api';
import { SecondEntity } from '../entities/second.entity';

@Component({
  selector: 'ard-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-rest-demo';

  tests: TestEntity[] = [];
  seconds: SecondEntity[] = [];

  constructor(private angularRestService: AngularRestService) {
    angularRestService.getManager(TestEntity).getAll();
    angularRestService.getManager(SecondEntity).getAll();
  }

}
