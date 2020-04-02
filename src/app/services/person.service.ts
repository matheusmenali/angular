import { HttpClient } from '@angular/common/http/';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


import { environment } from '../../environments/environment';

@Injectable()
export class PersonService {

  private url: string;
  private endpoint: string;

  constructor(public http: HttpClient) {
    this.url = environment.apiLocalUrl;
    this.endpoint = 'person'
  }

  public getPersons(): Observable<any> {
    return this.http.get(`${this.url}/persons`);
  }

  public insertPerson(person): Observable<any> {
    return this.http.post(`${this.url}/${this.endpoint}`, person);
  }

  public updatePerson(person): Observable<any> {
    return this.http.put(`${this.url}/${this.endpoint}/${person.id}`, person);
  }

  public deletePerson(id): Observable<any> {
    return this.http.delete(`${this.url}/${this.endpoint}/${id}`);
  }

}



