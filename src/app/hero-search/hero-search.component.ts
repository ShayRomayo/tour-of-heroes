import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {
  heroes$: Observable<Hero[]>;
  hero: Hero;

  constructor(private heroService: HeroService) {}

  // On submission of child form, search with given parameters
  search(terms: any[]): void {
    this.heroes$ = this.heroService.searchHeroes(terms);
  }

  ngOnInit(): void {
    this.hero = this.heroService.defaultHero();
  }
}
