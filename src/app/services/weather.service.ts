import { HttpClient } from '@angular/common/http/';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


import { environment } from '../../environments/environment';

@Injectable()
export class WeatherService {

  private url: string;
  private apiKey: string;


  constructor(public http: HttpClient) {
    this.url = environment.weatherApiUrl;
    this.apiKey = environment.weatherApiKeyService;
  }

  public getWeatherLocation(cityName): Observable<any> {
    return this.http.get<any>(`${this.url}${cityName}&appid=${this.apiKey}`);
  }

}

