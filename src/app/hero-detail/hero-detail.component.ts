import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

import { Hero } from "../hero";
import { HeroService } from "../hero.service";

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  hero: Hero;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
        .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

  save(newHero: any[]): void {
    this.hero.name = newHero[0].trim();
    this.hero.org = newHero[1];
    this.hero.fav = newHero[2];
    this.heroService.updateHero(this.hero)
        .subscribe(() => this.goBack());
  }

  ngOnInit(): void {
    this.getHero();
  }

}
