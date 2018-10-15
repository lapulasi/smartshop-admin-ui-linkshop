import {Component,Input, Output, EventEmitter} from '@angular/core';
import {DatePipe} from '@angular/common';
import {DataService} from "../data.service";

@Component({
  selector: 'app-data-common',
  templateUrl: './common.html'
})

export class CommonComponent {
  organizationName: any;
  currentIndex: any;
  companyId: any;
  orgCode: any;

  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();

  startDate: any;
  endDate: any;

  beginHour: any;
  endHour: any;

  levelList: any;
  level: any;
  levelId;

  isLevelData: boolean = true;

  startTime: any;
  endTime: any;

  dayType = '';

  @Input() page: any;
  @Input() timeShow: any;
  @Output() change = new EventEmitter();

  constructor(private service: DataService, private datePipe: DatePipe) {
    console.log(this.timeShow)
    this.bsValue.setDate(this.bsValue.getDate() - 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];

    this.startTime = this.datePipe.transform(new Date(), 'yyyy-MM-dd 00:00:00');
    this.endTime = this.datePipe.transform(new Date(), 'yyyy-MM-dd 23:59:59');
  }

  getLevelList() {
    if (this.orgCode === null || this.orgCode === undefined) {
      alert('请先选择组织')
    } else {
      this.service.getLevelList({orgCode: this.orgCode}).subscribe(data => {
        // console.log(JSON.stringify(data, null, 4));
        this.levelList = data;
        this.levelId = data[0].id
        this.isLevelData = false;
      })
    }
  }

  onLevelChange(event) {
    console.log(event);
    this.level = event;
    this.levelId = this.levelList[event].id
  }

  getCompanyInfo(event, staticModal) {
    this.currentIndex = event.currentIndex;
    if (this.currentIndex === undefined) {
      return;
    } else {
      staticModal.show();
      this.companyId = event.id;
    }
  }

  getOrgInfo(event) {
    // console.log(event);
    this.organizationName = event.name;
    this.orgCode = event.orgCode;
    this.getLevelList();
  }

  getTimeRange() {
    this.startDate = this.datePipe.transform(this.bsRangeValue[0], 'yyyy-MM-dd');
    this.endDate = this.datePipe.transform(this.bsRangeValue[1], 'yyyy-MM-dd');
  }

  getHour() {
    this.beginHour = this.datePipe.transform(this.startTime, 'yyyy-MM-dd HH:mm:ss').substr(11,2);
    this.endHour = this.datePipe.transform(this.endTime, 'yyyy-MM-dd HH:mm:ss').substr(11,2);
  }

  dataVerify() {
    if(!this.orgCode) {
      alert('请选择组织！');
      return false;
    }
    if(!this.levelId) {
      alert('请选择层级！');
      return false;
    }
    return true;
  }

  query() {
    this.getTimeRange();
    this.getHour();
    const requestInfo = {
      'dayType': this.dayType,
      'orgCode': this.orgCode,
      'levelId': this.levelId,
      'startDate': this.startDate,
      'endDate': this.endDate,
      'checkout': true,
      'beginHour': this.beginHour,
      'endHour': this.endHour
    };

    if(this.dataVerify()) {
      this.change.emit(requestInfo);
    }
  }

  exportExcel() {
    this.getTimeRange();
    this.getHour();
    const requestInfo = {
      'dayType': this.dayType,
      'orgCode': this.orgCode,
      'levelId': this.levelId,
      'startDate': this.startDate,
      'endDate': this.endDate,
      'checkout': false,
      'beginHour': this.beginHour,
      'endHour': this.endHour
    };

    if(this.dataVerify()) {
      this.change.emit(requestInfo);
    }

  }

}
