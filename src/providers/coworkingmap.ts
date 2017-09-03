import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http'; //URLSearchParams
import { Observable } from 'rxjs/Observable';
// import { Observable } from 'rxjs/Rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/Observable/throw';

import { user_config } from './coworkingmap.config';

@Injectable()
export class CoworkingmapProvider {
  url: string = 'https://coworkingmap.org/wp-json/jwt-auth/v1/token/';
  private token: string;
  constructor(private http: Http) { }

  /**
   * Filtering workspace hub by Country
   * @param countryName string
   */
  getWorkingSpaceFilterByCountry(countryName: string): Observable<any[]> {
    let url = 'https://coworkingmap.org/wp-json/spaces';
    let header = new Headers();
    header.append('Authorization', `Bearer ${this.token}`);
    let options = new RequestOptions({ headers: header });
    return this.http.get(`${url}/${countryName.toLowerCase()}`, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /**
   * Filtering workspace hub by city
   * @param countryName string
   */
  getWorkingSpaceFilterByCity(countryName: string, cityName: string): Observable<any[]> {
    let url = `https://coworkingmap.org/wp-json/spaces/${countryName.toLowerCase()}/${cityName.toLowerCase()}`;
    let header = new Headers();
    header.append('Authorization', `Bearer ${this.token}`);
    return this.http.get(url).map(this.extractData).catch(this.handleError);
  }

  /**
   * Set the new value for token
   * @param value token
   */
  setToken(value: string) {
    if (value !== undefined || value !== null)
      this.token = value;
  }

  /**
   * Get token from CoWorkingMap API
   */
  getToken(): Observable<any> {
    if (this.token === null || this.token === undefined) {
      let url = this.url + '/?username=' + user_config.username + '&password=' + user_config.password;
      let header = new Headers();
      header.append('Content-Type', 'application/json');
      let options = new RequestOptions({ headers: header });
      return this.http.post(url, options)
        .map(this.extractData);
    }
  }

  private extractData(response: Response) {
    return response.json();
  }

  private handleError(error: Response) {
    return Observable.throw(error.json().error || 'Server error.');
  }

}
