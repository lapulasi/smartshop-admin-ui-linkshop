import {Component, OnInit} from '@angular/core';
import {InventoryService} from '../inventory.service';
import {DatePipe} from '@angular/common';

@Component({
  templateUrl: './outboundRecords.html',
  styles: []
})
export class OutboundRecordsComponent implements OnInit {
  batchNo = '201801';
  cameraType: any;
  operateType: any;
  deviceUId: any;

  recordsList: any;

  recordIndex = 0;
  pageSize = 15;
  currPage = 0;
  totalItems;

  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();

  constructor(private service: InventoryService,
              private datePipe: DatePipe) {
    this.bsValue.setDate(this.bsValue.getDate() - 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];
  }

  ngOnInit() {

  }

  pageChanged(event) {
    // console.log(event)
    this.currPage = event.page - 1;
    this.check();
  }

  check() {
    const startDateStr = this.datePipe.transform(this.bsRangeValue[0], 'yyyy-MM-dd');
    const endDateStr = this.datePipe.transform(this.bsRangeValue[1], 'yyyy-MM-dd');
    this.service.outReconds({
      batchNo: this.batchNo,
      cameraType: this.cameraType,
      operateType: this.operateType,
      startDate: startDateStr,
      endDate: endDateStr,
      uid: this.deviceUId,
      page: this.currPage
    }).then(data => {
      // console.log(JSON.stringify(data, null, 4))
      this.recordsList = data.content;
      this.totalItems = data.totalElements;
    })
  }
}
