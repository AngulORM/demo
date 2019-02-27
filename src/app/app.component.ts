import {Component, OnInit} from '@angular/core';
import {Route, Router} from '@angular/router';

@Component({
  selector: 'ngf-demo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
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

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.printpath('', this.router.config);
  }

  printpath(parent: String, config: Route[]) {
    for (let i = 0; i < config.length; i++) {
      const route = config[i];
      console.log(parent + '/' + route.path);
      if (route.children) {
        const currentPath = route.path ? parent + '/' + route.path : parent;
        this.printpath(currentPath, route.children);
      }
    }
  }
}
