import {Component} from '@angular/core';
import {EmployeeService} from '../employee.service';
import {Router} from '@angular/router';
import {Contant} from '../../common/Contant';
import {OrgService} from "../../organization/orgService";

@Component({
  templateUrl: './clerkOnDuty.html',
  styles: ['.query_label{float: right;padding: 0.5rem 1rem 0.5rem;} .tx_img{width: 40px;height: 40px; border-radius: 50%;}']
})
export class ClerkOnDutyComponent {
  deviceList;
  circleList;
  shopList;

  companyModel: any = 0;
  deviceUId;
  shopName;
  shopId;
  recordIndex = 0;
  pageSize = 10;
  currPage: any = 1;
  totalItems;
  imgPrefix;
  companyId;
  companyName;

  organizationName;
  organizationId;
  token: any;


  constructor(private service: EmployeeService, private router: Router, private contant: Contant,
              private orgService: OrgService) {
    this.imgPrefix = contant.imgPrefix;
    this.token = JSON.parse(localStorage.getItem('token'));
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
      this.companyModel = event.companyModel
    }
    /*console.log(event);
    console.log('----- ==' + this.companyModel);*/
  }

  query() {
    this.deviceData();
  }

  getOrgInfo(event) {
    console.log(event);
    this.organizationName = event.name;
    this.organizationId = event.orgCode;
    console.log(this.companyModel)
  }

  deviceData() {
    // console.log('this.companyModel==' + this.currPage);
    if (this.companyModel === undefined) {
      alert('请选择公司！')
    } else {
      this.orgService.onDuty(this.organizationId, this.currPage).subscribe(data => {
        // console.log('data==' + JSON.stringify(data, null, 4));
        // if (data.resultCode === 'SUCCESS') {
        this.deviceList = data.content;
        this.totalItems = data.totalElements;
        // }
      })
    }
  }


}
