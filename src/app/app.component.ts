import {Component} from '@angular/core';
import {TestEntity} from '../entities/test.entity';

@Component({
  selector: 'ard-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-rest-demo';

  constructor() {
    const entity = new TestEntity();
    console.log(entity);
  }
}
