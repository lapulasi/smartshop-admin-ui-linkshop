import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'ng-pagination',
  templateUrl: './pagination.html'
})

export class Pagination{

  @Input() pageSize;
  @Input() totalCount;

  @Output() pageChange = new EventEmitter<number>();

  totalPage;
  currPage = 1;

  constructor() {
    this.totalPage = this.getTatlPage();
  }

  getTatlPage() {
    return Math.ceil(this.totalCount / this.pageSize) || 1;
  }
}
