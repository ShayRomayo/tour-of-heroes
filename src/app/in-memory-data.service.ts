import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Hero } from './hero';
import { Teams } from './Teams';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  createDb() {
    const heroes = [
      {id: 11, name: 'Dr Nice', fav: false, org: Teams.GoodGuys},
      {id: 12, name: 'Narco', fav: true, org: Teams.Baddies},
      {id: 13, name: 'Bombasto', fav: false, org: Teams.Baddies},
      {id: 14, name: 'Celeritas', fav: false, org: Teams.GoodGuys},
      {id: 15, name: 'Magneta', fav: false, org: Teams.Baddies},
      {id: 16, name: 'RubberMan', fav: false, org: Teams.GoodGuys},
      {id: 17, name: 'Dynama', fav: false, org: Teams.GoodGuys},
      {id: 18, name: 'Dr IQ', fav: false, org: Teams.GoodGuys},
      {id: 19, name: 'Magma', fav: false, org: Teams.Baddies},
      {id: 20, name: 'Tornado', fav: false, org: Teams.Gremen}
    ];
    return {heroes};
  }

  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }
}
