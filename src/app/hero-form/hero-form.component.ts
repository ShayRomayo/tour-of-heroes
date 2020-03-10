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
  @Output() onHeroSubmit: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  //TODO: Beautify with the CSS sheets. Possible Bootstrap for Reactive Web Design
  //TODO: Move clear functionality to the parent component, so it's an optional clear
  //TODO: Move fav checkbox into the hero-form
  public submit(name: string, org: string, fav: boolean) {
    let data = [name, org, fav];
    console.log(`Log:${this.hero}`);
    this.onHeroSubmit.emit(data);
  }
  ngOnInit(): void {
    this.orgOptions = Object.keys(Teams);
  }

}
