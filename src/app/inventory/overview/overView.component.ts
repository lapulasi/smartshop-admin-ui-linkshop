import {Component, OnInit} from '@angular/core';
import {InventoryService} from '../inventory.service';

@Component({
  templateUrl: './overView.html',
  styles: []
})
export class OverViewComponent implements OnInit {
  viewList: any;

  constructor(private service: InventoryService) {
  }

  ngOnInit() {
    this.getOverView();
  }

  getOverView() {
    this.service.overView().then(data => {
      // console.log(JSON.stringify(data, null, 4));
      this.viewList = data;
    })
  }
}
