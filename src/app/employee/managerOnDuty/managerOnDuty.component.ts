import {Component, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';
import {EmployeeService} from '../employee.service';
import {Router, ActivatedRoute} from '@angular/router';
import {Contant} from '../../common/Contant';
import {OrgService} from "../../organization/orgService";

@Component({
  templateUrl: './managerOnDuty.html',
  styles: ['.query_label{float: right;padding: 0.5rem 1rem 0.5rem;} .ava_img{width: 40px; height: 40px; border-radius: 50%}']
})
export class ManagerOnDutyComponent implements OnInit {
  deviceList; // 设备列表

  companyId;
  recordIndex = 0;
  pageSize = 10;
  currPage: any = 1;
  totalItems;
  imgPrefix;
  organizationName;
  organizationId;
  token: any;
  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();


  constructor(private service: EmployeeService,
              private router: Router,
              private route: ActivatedRoute,
              private datePipe: DatePipe,
              private contant: Contant,
              private orgService: OrgService) {
    this.imgPrefix = contant.imgPrefix;
    this.bsValue.setDate(this.bsValue.getDate() - 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];
  }

  ngOnInit() {
    this.token = JSON.parse(localStorage.getItem('token'));
    this.route.queryParams.subscribe(params => {
      this.organizationName = params['name'];
      this.organizationId = params['parentOrgId'];
      // console.log('this.name==' + this.organizationName + ';;this.id==' + this.organizationId);
    })
  }

  pageChanged(event) {
    this.currPage = event.page;
    this.deviceData();
  }
  getCompanyInfo(event, staticModal) {
    const currentIndex = event.currentIndex;
    if (currentIndex === undefined) {
      return;
    }else {
      staticModal.show();
      this.companyId = event.id;
    }
    console.log(event);
  }
  getOrgInfo(event) {
    // console.log(event);
    this.organizationName = event.name;
    this.organizationId = event.orgCode;
  }

  query() {
    this.deviceData();
  }

  deviceData() {
    const startDateStr = this.datePipe.transform(this.bsRangeValue[0], 'yyyy-MM-dd');
    const endDateStr = this.datePipe.transform(this.bsRangeValue[1], 'yyyy-MM-dd');
    if (this.bsRangeValue === null) {
      alert('请选择时间范围！')
    } else {
      this.orgService.managerOnDuty(this.organizationId, startDateStr, endDateStr, this.currPage).subscribe(data => {
        // console.log('data==' + JSON.stringify(data, null, 4))
        this.deviceList = data.content;
        // console.log(this.deviceList.length)
        this.totalItems = data.totalNum;
      });
  }

  }
}
