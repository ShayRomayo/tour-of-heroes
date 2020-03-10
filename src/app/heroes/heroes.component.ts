import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from "../hero.service";

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  hero: Hero;

  constructor(private heroService: HeroService) { }

  // Async safe method using subscribe to an Observable
  // Callback heroes from the subscribed observable to assign to this.heroes property
  getHeroes(): void {
    this.heroService.getHeroes()
        .subscribe(heroes => this.heroes = heroes);
  }

  add(hero: any[]): void {
    let name = hero[0].trim();
    let org: string = hero[1];
    let fav: boolean = hero[2];
    if(!name) { return; }
    this.heroService.addHero({name, org, fav} as Hero)
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
    this.hero = this.heroService.defaultHero();
  }
}
