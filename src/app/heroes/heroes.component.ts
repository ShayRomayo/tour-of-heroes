import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from "../hero.service";
import { Teams } from '../Teams';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  orgs = Teams;
  orgsOptions = [];

  constructor(private heroService: HeroService) { }

  // Async safe method using subscribe to an Observable
  // Callback heroes from the subscribed observable to assign to this.heroes property
  getHeroes(): void {
    this.heroService.getHeroes()
        .subscribe(heroes => this.heroes = heroes);
  }

  //TODO: Implement grouped heroes (teams)

  add(name: string, organization: string): void {
    name = name.trim();
    if(!name) { return; }
    this.heroService.addHero({name, organization} as Hero)
        .subscribe(hero => {
          this.heroes.push(hero);
        });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }

  ngOnInit(): void {
    this.getHeroes();
    this.orgsOptions = Object.keys(this.orgs);
  }
}
