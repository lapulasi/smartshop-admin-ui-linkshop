import {Component} from '@angular/core';
import {DataService} from "../data.service";

@Component({
  templateUrl: './sales.html'
})

export class SalesComponent {
  orgCode: any;
  startDate: any;
  endDate: any;
  levelId;
  excel_url: any
  salesData: any;

  constructor(private service: DataService) {
  }

  getInfo(event) {
    // console.log(JSON.stringify(event, null, 4));
    this.orgCode = event.orgCode;
    this.levelId = event.levelId;
    this.startDate = event.startDate;
    this.endDate = event.endDate;
    const checkout = event.checkout;
    if (checkout !== undefined) {
      if (checkout) {
        this.query();
      } else if (!checkout) {
        this.exportExcel();
      }
    }
  }

  query() {
    this.service.getSales({
      orgCode: this.orgCode,
      levelId: this.levelId,
      startDate: this.startDate,
      endDate: this.endDate
    }).subscribe(data => {
      // console.log(JSON.stringify(data, null, 4));
      this.salesData = data;
    })
  }

  exportExcel() {
    this.excel_url = this.service.exportSalesExcel({
      orgCode: this.orgCode,
      levelId: this.levelId,
      startDate: this.startDate,
      endDate: this.endDate
    })
    window.location.href = this.excel_url;
  }
}
