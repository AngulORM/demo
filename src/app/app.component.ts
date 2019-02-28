import {Component} from '@angular/core';

@Component({
  selector: 'ngf-demo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public navLinks = [
    {
      title: 'Home',
      routerLink: '/home'
    },
    {
      title: 'Articles',
      routerLink: '/articles'
    },
    {
      title: 'Breweries',
      routerLink: '/breweries'
    }];
}
