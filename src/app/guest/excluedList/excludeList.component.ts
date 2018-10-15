import {Component, OnInit} from '@angular/core';
import {GuestService} from '../guest.service';
import {OrgService} from "../../organization/orgService";
import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';
import {Contant} from '../../common/Contant';

@Component({
  templateUrl: './excludeList.html',
  styles: ['.query_label{float: right;padding: 0.5rem 1rem 0.5rem;}']
})
export class ExcludeListComponent implements OnInit {
  brandList;
  companyId;
  shopId;

  recordIndex = 0;
  pageSize = 15;
  currPage: any = 0;
  totalItems;

  faultList;
  imgPrefix;

  organizationName;
  orgId;

  constructor(private guestService: GuestService, private router: Router,
              private contant: Contant,
              private orgService: OrgService) {
    this.imgPrefix = contant.imgPrefix;
  }

  ngOnInit() {
    // this.companyData();
  }

  companyData() {
    this.guestService.listCompany().then(data => {
      this.brandList = data;
    });
  }

  onCompanyChange(event, staticModal) {
    staticModal.show();
    this.companyId = event;
  }

  getCompanyInfo(event, staticModal) {
    const currentIndex = event.currentIndex;
    if (currentIndex === undefined) {
      return;
    }else {
      staticModal.show();
      this.companyId = event.id;
    }
  }

  getOrgInfo(event) {
    // console.log(event);
    this.organizationName = event.name;
    this.orgId = event.orgCode;
  }

  pageChanged(event) {
    this.currPage = event.page - 1;
    this.search();
  }

  search() {
    this.orgService.searchFault(this.orgId,{
      page: this.currPage
    }).subscribe(data => {
      console.log(JSON.stringify(data, null, 4));
      this.faultList = data.content;
      this.totalItems = data.totalElements;
    })
  }

  delete(index) {
    this.guestService.deleteFault(this.faultList[index].shopId, this.faultList[index].guestId).subscribe(data => {
      console.log(JSON.stringify(data, null, 4));
      if (data['resultCode'] === 'SUCCESS') {
        alert('删除成功');
        this.search();
      }else {
        alert(data['errorMsg']);
      }
    })
  }
}
