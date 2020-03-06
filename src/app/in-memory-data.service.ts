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
      {id: 11, name: 'Dr Nice', favorite: false, organization: Teams.GoodGuys},
      {id: 12, name: 'Narco', favorite: true, organization: Teams.Baddies},
      {id: 13, name: 'Bombasto', favorite: false, organization: Teams.Baddies},
      {id: 14, name: 'Celeritas', favorite: false, organization: Teams.GoodGuys},
      {id: 15, name: 'Magneta', favorite: false, organization: Teams.Baddies},
      {id: 16, name: 'RubberMan', favorite: false, organization: Teams.GoodGuys},
      {id: 17, name: 'Dynama', favorite: false, organization: Teams.GoodGuys},
      {id: 18, name: 'Dr IQ', favorite: false, organization: Teams.GoodGuys},
      {id: 19, name: 'Magma', favorite: false, organization: Teams.Baddies},
      {id: 20, name: 'Tornado', favorite: false, organization: Teams.Gremen}
    ];
    return {heroes};
  }

  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }
}
