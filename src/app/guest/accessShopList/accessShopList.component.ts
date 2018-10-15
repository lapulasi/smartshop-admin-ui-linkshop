import {Component, OnInit} from '@angular/core';
import {GuestService} from '../guest.service';
import {DatePipe} from '@angular/common';
import {Contant} from '../../common/Contant';
import {Router, ActivatedRoute} from '@angular/router';
import {OrgService} from "../../organization/orgService";

@Component({
  templateUrl: './accessShopList.html',
  styles: ['.query_label{float: right;padding: 0.5rem 1rem 0.5rem;}']
})
export class AccessShopComponent implements OnInit {
  brandList; // 品牌列表
  companyId;

  imgPrefix;
  accessList: Array<any> = []; // 访问记录

  recordIndex = 0;
  pageSize = 15;
  currPage: any = 0;
  totalItems;

  guestId: any = '';
  organizationName: any = '';
  orgId: any = '';
  sub: any = '';

  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();
  showExcludedGuest: boolean = false;

  constructor(private guestService: GuestService,
              private datePipe: DatePipe,
              private contant: Contant,
              private router: Router,
              private route: ActivatedRoute,
              private orgService: OrgService) {
    this.imgPrefix = contant.imgPrefix;
    this.bsValue.setDate(this.bsValue.getDate() - 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];
    // this.companyData();
  }

  ngOnInit() {
    this.sub = this.route.queryParams.subscribe(params => {
      const guestId = params['guestId'];
      const orgId = params['orgId'];
      this.guestId = guestId == null ? '' : guestId;
      this.orgId = orgId == null ? null : orgId;
      if (this.guestId !== null && this.orgId != null) {
        this.check();
      }
      // console.log('this.guestId=' + this.guestId);
    })
  }

  query() {
    this.check();
  }

  // --------------
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
    } else {
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
    this.check();
  }

  /*operate(index) {
    // console.log(index);
    this.guestService.addToExcludeList({
      shopId: this.accessList[index].shop_id,
      guestId: this.accessList[index].guest_id,
      imgUrl: this.accessList[index].head_img
    }).then(data => {
      if (data['resultCode'] === 'SUCCESS') {
        this.router.navigate(['/guest/excludeList'])
      }
    })
  }*/

  check() {
    if (this.bsRangeValue === null) {
      this.orgService.pagingAccessShop(this.orgId, {
        page: this.currPage,
        guestId: this.guestId
      }).subscribe(data => {
        // console.log(JSON.stringify(data, null, 4));
        this.accessList = data.content;
        this.totalItems = data.totalElements;
      });
    } else {
      const startDateStr = this.datePipe.transform(this.bsRangeValue[0], 'yyyy-MM-dd');
      const endDateStr = this.datePipe.transform(this.bsRangeValue[1], 'yyyy-MM-dd');
      this.orgService.pagingAccessShop(this.orgId, {
        guestId: this.guestId,
        startDate: startDateStr,
        endDate: endDateStr,
        page: this.currPage
      }).subscribe(data => {
        // console.log(JSON.stringify(data, null, 4));
        this.accessList = data.content;
        this.totalItems = data.totalElements;
      });
    }
  }
}
