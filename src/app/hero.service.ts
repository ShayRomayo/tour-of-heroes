import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from "rxjs";
import { catchError, map, tap } from 'rxjs/operators';

import { Hero } from "./hero";
import { MessageService } from "./message.service";
import { Teams } from './Teams';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = 'api/heroes';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
               .pipe(
                 tap(_ => this.log('fetched heroes')),
                 catchError(this.handleError<Hero[]>('getHeroes', []))
               );
  }

  getHeroNo404<Data>(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/?id=${id}`;
    return this.http.get<Hero[]>(url)
               .pipe(
                 map(heroes => heroes[0]), // returns a {0|1} element array
                 tap(h => {
                   const outcome = h ? `fetched` : `did not find`;
                   this.log(`${outcome} hero id=${id}`);
                 }),
                 catchError(this.handleError<Hero>(`getHero id=${id}`))
               );
  }

  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  addHero (hero: Hero): Observable<Hero> {
    hero.fav = false;
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  updateHero (hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  deleteHero (hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  searchHeroes(terms: string[]): Observable<Hero[]> {
    let name: string = terms[0].trim();
    let org: string = encodeURI(terms[1]);
    if (!name) {
      // if not search term, return empty hero array.
      return of([]);
    }
    if (org != Teams.None) {
      return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${name}&org=${org}`).pipe(
        tap(x => x.length ?
          this.log(`found heroes matching filter tag org:"${terms[1]}" & name:"${name}"`) :
          this.log(`no heroes matching filter tag org:"${terms[1]}" & name:"${name}"`)),
        catchError(this.handleError<Hero[]>('searchHeroes', []))
      );
    }

    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${name}`).pipe(
      tap(x => x.length ?
        this.log(`found heroes matching "${name}"`) :
        this.log(`no heroes matching "${name}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead

      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
