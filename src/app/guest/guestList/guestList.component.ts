import {Component} from '@angular/core';
import {GuestService} from '../guest.service';
import {Contant} from '../../common/Contant';
import {Router} from '@angular/router';
import {OrgService} from "../../organization/orgService";

@Component({
  templateUrl: './guestList.html',
  styles: ['.query_label{float: right;padding: 0.5rem 1rem 0.5rem;}']
})
export class GuestInfoComponent {
  companyList;
  shopList; // 门店列表
  guestList; // 顾客列表

  companyId;
  shopModel;
  recordIndex = 0;
  pageSize = 15;
  totalItems;
  currPage = 0;
  imgPrefix;

  organizationName;
  orgId;
  minAccessCount: any = 1;
  currentIndex: any;


  constructor(private guestService: GuestService, private contant: Contant, private router: Router,
              private orgService: OrgService) {
    this.imgPrefix = contant.imgPrefix;
    // this.companyData();
  }

  query() {
    this.guestData();
  }

  pageChanged(event) {
    this.currPage = event.page - 1;
    this.guestData();
  }

  onBrandChange(event, staticModal) {
    staticModal.show();
    this.companyId = event;
  }

  getCompanyInfo(event, staticModal) {
    this.currentIndex = event.currentIndex;
    if (this.currentIndex === undefined) {
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

  // --------------
  companyData() {
    this.guestService.listCompany().then(data => {
      this.companyList = data;
    });
  }

  guestData() {
    this.orgService.pagingGuest(this.orgId, {
      minAccessCount: this.minAccessCount,
      page: this.currPage
    }).subscribe(data => {
      // console.log(JSON.stringify(data, null, 4));
      this.guestList = data.content;
      this.totalItems = data.totalElements;
    });
  }

  checkRecord(index) {
    // console.log(this.guestList[index].guestId)
    this.router.navigate(['/guest/accessShop'], {queryParams: {'guestId': this.guestList[index].guestId, 'orgId': this.orgId}});
  }

  operate(index) {
    this.orgService.addToExcludeList(this.orgId,
      this.guestList[index].shopId,
      this.guestList[index].guestId
    ).subscribe(data => {
      // console.log(JSON.stringify(data, null, 4))
      if (data.resultCode === 'SUCCESS') {
        // this.router.navigate(['/guest/excludeList'])
        this.guestData();
      }
    })
  }

}
