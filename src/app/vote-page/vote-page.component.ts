import { Component, OnInit } from '@angular/core';

import { VotePageService } from './vote-page.service';
import { VoteItem } from './vote-page.model';

@Component({
  selector: 'app-vote-page',
  templateUrl: './vote-page.component.html',
  styleUrls: ['./vote-page.component.css']
})
export class VotePageComponent implements OnInit {
  items: Array<VoteItem>;
  idColumn: string;
  nameColumn: string;
  voteColumn: string;
  removeColumn: string;
  initDone: boolean;

  constructor(private votePageService: VotePageService) {
    this.items = new Array<VoteItem>();
    this.initDone = false;
    this.idColumn = "ID";
    this.nameColumn = "Name";
    this.voteColumn = "Vote";
    this.removeColumn = "Remove";
  }

  ngOnInit() {
    this.votePageService.getItems().subscribe(items => {
      this.items = items;
      this.initDone = true;
    });
  }

  addItem(name) {
    const newId = this.items.length + 1;
    if (this.items.some(item => item.name === name)) {
      return;
    }
    this.items.push({
      id: newId,
      name: name
    });
  }

  removeItem(item) {
    this.items.splice(this.items.indexOf(item), 1);
  }
}
