import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {
  fav: boolean = false;
  heroes$: Observable<Hero[]>;
  // private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService) {}

  // On submission of child form, search with given parameters
  search(terms: string[]): void {
    this.heroes$ = this.heroService.searchHeroes(terms, this.fav);
    // this.searchTerms.next(term);
  }

  // Maintained old method of using a stream to inject search terms into hero service
  ngOnInit(): void {
    // this.heroes$ = this.searchTerms.pipe(
    //   // wait 300ms after each keystroke before considering the term
    //   debounceTime(300),
    //
    //   // ignore new term if same as previous term
    //   distinctUntilChanged(),
    //
    //   // switch to new search observable each time the term changes
    //   switchMap((term: string) => this.heroService.searchHeroes(term))
    // );
  }
}
