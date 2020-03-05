import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tour of Heroes';
  myHero: string;
  //TODO: Implement displays of favorite heroes and selection of favorite heroes

  constructor() {
    this.myHero = 'Narco';
  }
}
