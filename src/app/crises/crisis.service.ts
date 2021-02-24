import { Injectable } from '@angular/core';

import { Crisis } from './crisis';
import { Crises } from './mock-crises';
import { Observable, of } from 'rxjs';
import { MessageService } from '../message.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CrisisService {
  private crisesUrl = 'api/crises';

  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

  constructor(private messageService: MessageService,  private http: HttpClient) { }

  getCrises(): Observable<Crisis[]> {
    return this.http.get<Crisis[]>(this.crisesUrl)
    .pipe(
      tap(_ => this.log('fetched crises')),
      catchError(this.handleError<Crisis[]>('getCrises', []))
    );
  }

  getCrisis(id: number): Observable<Crisis> {
    const url = `${this.crisesUrl}/${id}`;
    return this.http.get<Crisis>(url).pipe(
      tap(_ => this.log(`fetched crisis id=${id}`)),
      catchError(this.handleError<Crisis>(`Crisis id=${id}`))
    );
  }

  updateCrisis(crisis: Crisis): Observable<any> {
    return this.http.put(this.crisesUrl, crisis, this.httpOptions)
    .pipe(
      tap(_ => this.log(`updated crisis id=${crisis.id}`)),
      catchError(this.handleError<any>('updateCrisis'))
    );
  }

  addCrisis(crisis: Crisis): Observable<Crisis> {
    return this.http.post<Crisis>(this.crisesUrl, crisis, this.httpOptions)
    .pipe(
      tap((newCrisis: Crisis) => this.log(`added crisis w/ id=${newCrisis.id}`)),
      catchError(this.handleError<Crisis>('addCrisis'))
    );
  }

  deleteCrisis(crisis: Crisis | number): Observable<Crisis> {
    const id = typeof crisis === 'number' ? crisis : crisis.id;
    const url = `${this.crisesUrl}/${id}`;
  
    return this.http.delete<Crisis>(url, this.httpOptions)
    .pipe(
      tap(_ => this.log(`deleted crisis id=${id}`)),
      catchError(this.handleError<Crisis>('deleteCrisis'))
    );
  }

  searchCrises(term: string): Observable<Crisis[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Crisis[]>(`${this.crisesUrl}/?name=${term}`)
    .pipe(
      tap(x => x.length ?
        this.log(`found crises matching "${term}"`) :
        this.log(`no crises matching "${term}"`)),
      catchError(this.handleError<Crisis[]>('searchCrises', []))
    );
  }

  private log(message: string) {
    this.messageService.add(`CrisisService: ${message}`);
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
