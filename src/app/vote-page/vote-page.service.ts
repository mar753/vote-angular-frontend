import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

import { VoteItem } from './vote-page.model';

@Injectable({
  providedIn: 'root'
})
export class VotePageService {
  url: string;
  itemsRoute: string;

  constructor(private httpClient: HttpClient) {
    this.url = environment.server;
    this.itemsRoute = environment.itemsRoute;
  }

  getItems(): Observable<Array<VoteItem>> {
    return this.httpClient.get(this.url + this.itemsRoute)
      .pipe(map(response => response['items']));
  }

  postItem(name: string): Observable<any> {
    const body = {
      value: name
    };
    return this.httpClient.post(this.url + this.itemsRoute, body);
  }

  putItem(id: number, value: number): Observable<any> {
    const body = {
      value: value
    };
    return this.httpClient.put(this.url + this.itemsRoute + '/' + id, body);
  }

  deleteItem(id: number): Observable<any> {
    return this.httpClient.delete(this.url + this.itemsRoute + '/' + id, {});
  }
}
