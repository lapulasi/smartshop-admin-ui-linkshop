import { Component, OnInit } from '@angular/core';
import {DataService} from "../../data.service";
import {DatePipe} from "@angular/common";
import {Router} from "@angular/router";
import {equalParamsAndUrlSegments} from "@angular/router/src/router_state";

@Component({
  selector: 'app-device-org',
  templateUrl: './org.component.html'
})
export class OrgComponent implements OnInit {

  organizationName: any;
  currentIndex: any;
  companyId: any;
  orgCode: any;

  levelList: any;
  levelId: any;
  isLevelData = true;

  bsValue = new Date();
  maxDate = new Date();
  bsRangeValue: Date[];
  startDate: any;
  endDate: any;

  resultList: any;

  constructor(private service: DataService, private datePipe: DatePipe, private router: Router) {}

  ngOnInit() {
    this.bsValue.setDate(this.bsValue.getDate() - 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];
  }

  getOrgInfo(event) {
  // console.log(event);
  this.organizationName = event.name;
  this.orgCode = event.orgCode;
  this.getLevelList();
}

  getLevelList() {
    if (this.orgCode === null || this.orgCode === undefined) {
      alert('请先选择组织')
    } else {
      this.levelId = 0;
      this.service.getLevelList({orgCode: this.orgCode}).subscribe(data => {
        // 不展示门店
        data.pop();
        this.levelList = data;
        // console.log(data);
        this.isLevelData = false;
      })
    }
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


  query() {
    if(!this.orgCode) {
      alert('请选择组织！');
      return;
    }
    if(!this.levelId || this.levelId === 0) {
      alert('请选择层级！');
      return;
    }
    this.startDate = this.datePipe.transform(this.bsRangeValue[0], 'yyyy-MM-dd');
    this.endDate = this.datePipe.transform(this.bsRangeValue[1], 'yyyy-MM-dd');
    // console.log(this.orgCode, this.levelId, this.startDate, this.endDate);

    this.service.listOrgDevice(this.orgCode, this.levelId, this.startDate, this.endDate).subscribe(data=> {
      // console.log(data);
      this.resultList = data;
    });

  }

  toShopPage(id, name) {
    this.startDate = this.datePipe.transform(this.bsRangeValue[0], 'yyyy-MM-dd');
    this.endDate = this.datePipe.transform(this.bsRangeValue[1], 'yyyy-MM-dd');
    this.router.navigate(['/data/shop'], {queryParams: {companyId: this.companyId, orgId: id, name: name, startDate: this.startDate, endDate: this.endDate}});
  }

}
