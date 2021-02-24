import { Injectable } from '@angular/core';

import { Crisis } from './crisis';
import { Crises } from './mock-crisi';
import { Observable, of } from 'rxjs';
import { MessageService } from '../message.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = 'api/heroes';

  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

  constructor(private messageService: MessageService,  private http: HttpClient) { }

  /*getHeroes(): Observable<Hero[]>{
    const heroes = of(Heroes);
    this.messageService.add('HeroService: fetched heroes');
    return heroes
  }*/

  /** GET heroes from the server */
  getHeroes(): Observable<Crisis[]> {
    return this.http.get<Crisis[]>(this.heroesUrl)
    .pipe(
      tap(_ => this.log('fetched heroes')),
      catchError(this.handleError<Crisis[]>('getHeroes', []))
    );
  }

  /** GET hero by id. Will 404 if id not found */
  getHero(id: number): Observable<Crisis> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Crisis>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Crisis>(`getHero id=${id}`))
    );
  }

  updateHero(hero: Crisis): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions)
    .pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  addHero(hero: Crisis): Observable<Crisis> {
    return this.http.post<Crisis>(this.heroesUrl, hero, this.httpOptions)
    .pipe(
      tap((newHero: Crisis) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Crisis>('addHero'))
    );
  }

  deleteHero(hero: Crisis | number): Observable<Crisis> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;
  
    return this.http.delete<Crisis>(url, this.httpOptions)
    .pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Crisis>('deleteHero'))
    );
  }

  /* GET heroes whose name contains search term */
  searchHeroes(term: string): Observable<Crisis[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Crisis[]>(`${this.heroesUrl}/?name=${term}`)
    .pipe(
      tap(x => x.length ?
        this.log(`found heroes matching "${term}"`) :
        this.log(`no heroes matching "${term}"`)),
      catchError(this.handleError<Crisis[]>('searchHeroes', []))
    );
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
