import {Component} from '@angular/core';
import {DataService} from "../data.service";


@Component({
  templateUrl: './dwellTime.html'
})

export class DwellTimeComponent {
  orgCode: any;
  startDate: any;
  endDate: any;
  beginHour: any;
  endHour: any;
  levelId;
  excel_url: any
  dwellDate: any;
  dayType = '';

  constructor(private service: DataService) {
  }

  getInfo(event) {
    console.log(JSON.stringify(event, null, 4));
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
    this.service.getDwell({
      dayType: this.dayType,
      orgCode: this.orgCode,
      levelId: this.levelId,
      startDate: this.startDate,
      endDate: this.endDate,
      beginHour: this.beginHour,
      endHour: this.endHour
    }).subscribe(data => {
      // console.log(JSON.stringify(data, null, 4));
      this.dwellDate = data;
    })
  }

  exportExcel() {
    this.excel_url = this.service.exportDwellExcel({
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
