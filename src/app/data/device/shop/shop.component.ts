import { Component, OnInit } from '@angular/core';
import {DatePipe} from '@angular/common';
import {DataService} from '../../data.service';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-device-shop',
  templateUrl: './shop.component.html'
})
export class ShopComponent implements OnInit {

  organizationName: any;
  currentIndex: any;
  companyId: any;
  orgId: any;

  bsValue = new Date();
  maxDate = new Date();
  bsRangeValue: Date[];
  startDate: any;
  endDate: any;

  resultList: any;

  constructor(private service: DataService, private datePipe: DatePipe, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(queryParams => {
      if(queryParams && queryParams.orgId) {
        this.orgId = queryParams.orgId;
        this.companyId = queryParams.companyId;
        this.organizationName = queryParams.name;
        this.bsRangeValue = [new Date(queryParams.startDate), new Date(queryParams.endDate)];
        this.query();
      }else {
        this.bsValue.setDate(this.bsValue.getDate() - 7);
        this.bsRangeValue = [this.bsValue, this.maxDate];
      }
    });
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
    this.orgId = event._id;
  }

  query() {
    if(!this.orgId) {
      alert('请选择组织！');
      return;
    }

    this.startDate = this.datePipe.transform(this.bsRangeValue[0], 'yyyy-MM-dd');
    this.endDate = this.datePipe.transform(this.bsRangeValue[1], 'yyyy-MM-dd');

    this.service.listShopDevice(this.orgId, this.startDate, this.endDate).subscribe(data => {
      this.resultList = data;
      // console.log(data);
    });

  }

}
