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

  searchHeroes(terms: string[], fav: boolean): Observable<Hero[]> {
    let name: string = terms[0].trim();
    let org: string = encodeURI(terms[1]);
    let url: string = `${this.heroesUrl}/?`;
    let message: string;

    if (name.length > 0) {
      message = `name matching "${name}"`;
      url = `${url}name=${name}`;
      if (org != Teams.None) {
        message = `${message} or an org matching "${terms[1]}"`;
        url = `${url}&org=${org}`;
      }
      if (fav) {
        message = `${message} that were favorited`;
        url = `${url}&fav=${fav}`;
      }

      return this.http.get<Hero[]>(url).pipe(
        tap(x => x.length ?
          this.log(`found hero(es) with ${message}`) :
          this.log(`found no hero(es) with ${message}`)),
        catchError(this.handleError<Hero[]>('searchHeroes', []))
      );
    } else if (org != Teams.None) {
      message = `hero(es) that belong to ${terms[1]}`;
      url = `${url}org=${org}`;
      if (fav) {
        message = `favorited ${message}`;
        url = `${url}&fav=${fav}`;
      }

      return this.http.get<Hero[]>(url).pipe(
        tap(x => x.length ?
          this.log(`Displaying ${message}`) :
          this.log(`Found no ${message}`)),
        catchError(this.handleError<Hero[]>('searchHeroes', []))
      );
    } else if (fav) {
      url = `${url}fav=${fav}`;

      return this.http.get<Hero[]>(url).pipe(
        tap(x => x.length ?
          this.log("Displaying favorite hero(es)") :
          this.log("Found no favorited heroes")),
        catchError(this.handleError<Hero[]>('searchHeroes', []))
      );
    } else { // if not search term, return empty hero array.
      return of([]);
    }
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
