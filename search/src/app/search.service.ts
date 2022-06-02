import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, delay, EMPTY, map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(
    private http: HttpClient
  ) {
    this.thyHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  }

  public baseUrl = 'http://localhost:5000/api/'
  public thyHeaders
  public searchResults: any;
  private seriesName = new BehaviorSubject<string>('')
  sharedMovieName = this.seriesName.asObservable()

  nextMovieName(name: string) {
    this.seriesName.next(name)
  }

  public searchByPlatformName(name: string): Observable<any> {
    if (name === '') {
      return EMPTY.pipe(delay(10))
    } else {
      return this.http.get(this.baseUrl + 'platforms/name/' + name, { headers: this.thyHeaders }).pipe(
        map(response => {
          return this.searchResults = response
        })
      )
    }
  }

  public _searchByPlatformNameEntries(name: string) {
    return this.searchByPlatformName(name);
  }

  public searchByGenreName(name: string): Observable<any> {
    if (name === '') {
      return EMPTY.pipe(delay(10))
    } else {
      return this.http.get(this.baseUrl + 'genres/name/' + name, { headers: this.thyHeaders }).pipe(
        map(response => {
          return this.searchResults = response
        })
      )
    }
  }

  public _searchByGenreNameEntries(name: string) {
    return this.searchByGenreName(name);
  }

  public searchByProducerName(name: string): Observable<any> {
    if (name === '') {
      return EMPTY.pipe(delay(10))
    } else {
      return this.http.get(this.baseUrl + 'people/producer/' + name, { headers: this.thyHeaders }).pipe(
        map(response => {
          return this.searchResults = response
        })
      )
    }
  }

  public _searchByProducerName(name: string) {
    return this.searchByProducerName(name);
  }

  public searchByCreatorName(name: string): Observable<any> {
    if (name === '') {
      return EMPTY.pipe(delay(10))
    } else {
      return this.http.get(this.baseUrl + 'people/creator/' + name, { headers: this.thyHeaders }).pipe(
        map(response => {
          return this.searchResults = response
        })
      )
    }
  }

  public _searchByCreatorName(name: string) {
    return this.searchByCreatorName(name);
  }

  public searchByDirectorName(name: string): Observable<any> {
    if (name === '') {
      return EMPTY.pipe(delay(10))
    } else {
      return this.http.get(this.baseUrl + 'people/director/' + name, { headers: this.thyHeaders }).pipe(
        map(response => {
          console.log(response)
          return this.searchResults = response
        })
      )
    }
  }

  public _searchByDirectorName(name: string) {
    return this.searchByDirectorName(name);
  }

  public searchBySeriesName(name: string): Observable<any> {
    if (name === '') {
      return EMPTY.pipe(delay(10))
    } else {
      return this.http.get(this.baseUrl + 'series/name/' + name, { headers: this.thyHeaders }).pipe(
        map(response => {
          return this.searchResults = response
        })
      )
    }
  }

  public _searchBySeriesName(name: string) {
    return this.searchBySeriesName(name);
  }

  public getSerieByNAme(name: string): Observable<any> {
    return this.http.get(this.baseUrl + 'series/name/' + name, { headers: this.thyHeaders })
  }

  public getSimilarSeries(name: string): Observable<any> {
    return this.http.get(this.baseUrl + 'series/similar/' + name, { headers: this.thyHeaders })
  }
}
