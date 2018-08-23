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
  edit: boolean;

  constructor(private votePageService: VotePageService) {
    this.items = new Array<VoteItem>();
    this.initDone = false;
    this.idColumn = "ID";
    this.nameColumn = "Name";
    this.voteColumn = "Vote";
    this.removeColumn = "Remove";
    this.edit = false;
  }

  ngOnInit() {
    this.votePageService.getItems().subscribe(items => {
      this.items = items;
      this.initDone = true;
      },
      err => {console.error(err);}
    );
  }

  addItem(name) {
    let newId = 1;
    if (this.items.length > 0) {
      newId = this.items[this.items.length-1].id + 1;
    }
    if (this.items.some(item => item.name === name)) {
      return;
    }
    this.items.push({
      id: newId,
      name: name,
      editing: false,
      modified: false
    });
    this.votePageService.postItem(name).subscribe(
      () => {},
      err => {console.error(err);}
    );
  }

  editItem(item) {
    if (item.editing && item.modified) {
      this.votePageService.putItem(item.id, item.name).subscribe(
        () => {},
        err => {console.error(err);}
      );
      item.modified = false;
    }
    item.editing = !item.editing;
  }

  removeItem(item) {
    const id = item.id;
    this.items.splice(this.items.indexOf(item), 1);
    this.votePageService.deleteItem(id).subscribe(
      () => {},
      err => {console.error(err);}
    );
  }

  handleItemChange(item) {
    item.modified = true;
  }
}
