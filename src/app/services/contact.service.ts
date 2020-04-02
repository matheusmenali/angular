import { HttpClient } from '@angular/common/http/';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


import { environment } from '../../environments/environment';

@Injectable()
export class ContactService {

  private url: string;
  private endpoint: string;

  constructor(public http: HttpClient) {
    this.url = environment.apiLocalUrl;
    this.endpoint = 'contact'
  }

  public getContacts(personId): Observable<any> {
    return this.http.get(`${this.url}/${this.endpoint}/${personId}`);
  }

  public insertContact(contact): Observable<any> {
    return this.http.post(`${this.url}/${this.endpoint}`, contact);
  }

  public updateContact(contact): Observable<any> {
    return this.http.put(`${this.url}/${this.endpoint}/${contact.id}`, contact);
  }

  public deleteContact(id): Observable<any> {
    return this.http.delete(`${this.url}/${this.endpoint}/${id}`);
  }

}



