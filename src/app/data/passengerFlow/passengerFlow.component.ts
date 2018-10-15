import {Component} from '@angular/core';
import {DataService} from "../data.service";

@Component({
  templateUrl: './passengerFlow.html'
})
export class PassengerFlowComponent {
  orgCode: any;
  startDate: any;
  endDate: any;
  beginHour: any;
  endHour: any;
  levelId;
  excel_url: any
  flowData: any;
  dayType = '';

  constructor(private service: DataService) {
  }

  getInfo(event) {
    this.dayType = event.dayType,
    this.orgCode = event.orgCode;
    this.levelId = event.levelId;
    this.startDate = event.startDate;
    this.endDate = event.endDate;
    this.beginHour = event.beginHour;
    this.endHour = event.endHour;
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
    this.service.getFlow({
      dayType: this.dayType,
      orgCode: this.orgCode,
      levelId: this.levelId,
      startDate: this.startDate,
      endDate: this.endDate,
      beginHour: this.beginHour,
      endHour: this.endHour
    }).subscribe(data => {
      console.log(JSON.stringify(data, null, 4));
      this.flowData = data;
    })
  }

  exportExcel() {
    this.excel_url = this.service.exportFlowExcel({
      dayType: this.dayType,
      orgCode: this.orgCode,
      levelId: this.levelId,
      startDate: this.startDate,
      endDate: this.endDate,
      beginHour: this.beginHour,
      endHour: this.endHour
    })
    window.location.href = this.excel_url;
  }
}


