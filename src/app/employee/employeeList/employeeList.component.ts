import {Component, OnInit} from '@angular/core';
import {EmployeeService} from '../employee.service';
import {OrgService} from "../../organization/orgService";
import {Router} from '@angular/router';
import {Contant} from '../../common/Contant';
import {isUndefined} from "util";

@Component({
  templateUrl: './employeeList.html',
  styles: ['.query_label{float: right;padding: 0.5rem 1rem 0.5rem;}']
})
export class EmployeeInfoComponent implements OnInit{
  circleList; // 商圈列表
  circleSubList; // 商圈列表
  deviceList; // 设备列表

  companyModel;
  companyId;
  companyName;
  circleModel;
  userUId: any = 0;
  shopName;
  recordIndex = 0;
  pageSize = 15;
  currPage: any = 0;
  totalItems;
  imgPrefix;

  organizationName;
  organizationId;

  token: any;
  orgIds: any;


  constructor(private service: EmployeeService, private router: Router,
              private contant: Contant,
              private orgService: OrgService) {
    this.imgPrefix = contant.imgPrefix;
    this.token = JSON.parse(localStorage.getItem('token'));
  }

  ngOnInit() {
    let orgName = sessionStorage.getItem('orgName');
    let orgId = sessionStorage.getItem('orgId');
    let comModel = sessionStorage.getItem('comModel');
    if(orgId!==null && orgName!==null && comModel!==null) {
      this.organizationId = orgId;
      this.organizationName = orgName;
      this.companyModel = comModel;
      this.deviceData();
    }
  }

  checkEmployee() {
    this.deviceData();
  }

  getCompanyInfo(event, staticModal) {
    const currentIndex = event.currentIndex;
    if (currentIndex === undefined) {
      return;
    } else {
      staticModal.show();
      this.companyId = event.id;
      this.companyModel = event.companyModel
    }
    // console.log(event.companyModel);
  }

  pageChanged(event) {
    // console.log('currPage==' + JSON.stringify(event, null, 4));
    this.currPage = event.page - 1;
    this.deviceData();
  }

  getOrgInfo(event) {
    // console.log('event===' + JSON.stringify(event, null, 4));
    this.organizationName = event.name;
    this.organizationId = event.orgCode;
  }

  deviceData() {
    // console.log(this.companyModel)
    if (this.companyModel === undefined) {
      alert('请选择公司！')
    } else {
      this.orgService.employList(this.organizationId, this.userUId, this.currPage).subscribe(data => {
        // console.log(JSON.stringify(data, null, 4))
        this.deviceList = data.content;
        this.totalItems = data.totalElements;
      });
    }
  }

  deleteUser(index) {
    // console.log(this.deviceList[index].id);
    this.orgService.deleteUser(this.deviceList[index]._id, this.token).subscribe(data => {
      console.log(JSON.stringify(data, null, 4));
      if (data['resultCode'] === 'SUCCESS') {
        alert('删除成功！');
        this.deviceData();
      } else {
        alert(data['errorMsg'])
      }
    })
  }

  OrgAuthorization(index) {
    const userId = this.deviceList[index]._id;
    console.log(userId)
    sessionStorage.setItem('orgName', this.organizationName);
    sessionStorage.setItem('orgId', this.organizationId);
    sessionStorage.setItem('comModel', this.companyModel)
    this.router.navigate(['/employee/orgAuthorization'], {queryParams: {'userId': userId}})
  }
}
