import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Teams } from '../Teams';
import { Hero } from '../hero';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.css']
})
export class HeroFormComponent implements OnInit {
  orgs = Teams;
  orgOptions = [];
  @Input() hero: Hero;
  @Input() clear: boolean;
  @Output() onHeroSubmit: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  //TODO: Beautify with the CSS sheets. Possible Bootstrap for Reactive Web Design
  public submit(name: string, org: string, fav: boolean) {
    let data = [name, org, fav];
    console.log(`Log:${this.hero}`);
    this.onHeroSubmit.emit(data);
  }
  ngOnInit(): void {
    this.orgOptions = Object.keys(Teams);
  }

}
