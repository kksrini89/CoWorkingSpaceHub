import { CoWorkingSpace } from './../models/coworkingmapresult.interface';
import { Injectable } from '@angular/core';
import { Http, RequestOptions, RequestOptionsArgs, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/Observable/throw';

import { user_config } from './coworkingmap.config';
import { CoWorkingMap } from '../models/coworkingmap.interface';

@Injectable()
export class CoworkingmapProvider {
  url: string;
  token: string;
  constructor(private http: Http) {
    this.url = 'https://coworkingmap.org/wp-json/jwt-auth/v1/token/';
    this.getToken();
  }

  getWorkingSpaceFilterByCountry(countryName: string): Observable<CoWorkingSpace[]> {
    let url = 'https://coworkingmap.org/wp-json/spaces';
    return this.http.get(`${url}/${countryName.toLowerCase()}`)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getWorkingSpaceFilterByCity(countryName: string, cityName: string): Observable<CoWorkingSpace[]> {
    let url = `https://coworkingmap.org/wp-json/spaces/${countryName.toLowerCase()}`;
    return this.http.get(`${url}/${cityName.toLowerCase()}`)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /**
   * Set the new value for token
   * @param value token
   */
  setToken(value: string) {
    this.token = value;
  }

  /**
   * Get token from CoWorkingMap API
   */
  getToken() {
    if (this.token !== null && this.token !== undefined) {
      let params: URLSearchParams = new URLSearchParams();
      params.set('username', user_config.username);
      params.set('password', user_config.password);

      // this.http.post(`${this.url}/?username=${user_config.username}&password=${user_config.password}`)
      this.http.post(`${this.url}`, { search: params })
        .map(data => {
          console.log(data);
          this.setToken(data.json().token);
        });
    }
  }

  private extractData(response: Response) {
    return response.json();
  }

  private handleError(error: Response) {
    return Observable.throw(error.json().error || 'Server error.');
  }

}
