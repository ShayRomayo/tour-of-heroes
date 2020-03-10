import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { Teams } from '../Teams';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.css']
})
export class HeroFormComponent implements OnInit {
  orgs = Teams;
  orgOptions = [];
  @Output() onHeroSubmit: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  public submit(name: string, org: string) {
    let data = [name, org];
    this.onHeroSubmit.emit(data);
  }
  ngOnInit(): void {
    this.orgOptions = Object.keys(Teams);
  }

}
