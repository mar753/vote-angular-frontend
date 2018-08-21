import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { VoteItem } from './vote-page.model';

@Injectable({
  providedIn: 'root'
})
export class VotePageService {
  url: string;
  itemsPath: string;

  constructor(private httpClient: HttpClient) {
    this.url = 'http://localhost:3000';
    this.itemsPath = '/items';
  }

  getItems(): Observable<Array<VoteItem>> {
    return this.httpClient.get(this.url + this.itemsPath)
      .pipe(map(response => response['items']));
  }
}
