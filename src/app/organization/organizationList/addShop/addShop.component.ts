import {Component, OnInit} from '@angular/core';
import {OrganizationService} from '../../organization.service';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  templateUrl: './addShop.html'
})
export class AddShopComponent implements OnInit {
  sub: any;
  parentName: any;
  storeName: any;
  brandList: any;//卖场品牌
  brandNameList: any;//卖场名称
  storeBrand: any;
  brandName: any;
  companyId: any;

  constructor(private route: ActivatedRoute, private service: OrganizationService, private router: Router) {
  }

  ngOnInit() {
    this.sub = this.route.queryParams.subscribe(params => {
      this.parentName = params['name'];
      this.storeBrand = params['parentOrgId'];
      this.companyId = params['companyId'];
      // console.log('this.parentName=' + this.parentName);
    })
    this.getChannelList();
  }

  onStoreBrandChange(event) {
    this.brandNameList = this.brandList[event].channels;
    // this.storeBrand = this.brandList[event].channelTypeId;
    // console.log('this.storeBrand==' + this.storeBrand);
  }

  onBrandNameChange(event) {
    this.brandName = event;
    // console.log('this.brandName==' + this.brandName)
  }

  getChannelList() {
    this.service.getChannelList().then(data => {
      // console.log('getChannelList==' + JSON.stringify(data, null, 4));
      if (data.resultCode === 'SUCCESS') {
        this.brandList = data.resultData;
        // console.log(this.brandList.length);
      }
    })
  }

  addShop() {
    this.service.creatShop({
      name: this.storeName,
      parentOrgId: this.storeBrand,
      storeId: this.brandName,
      companyId: this.companyId,
    }).subscribe(data => {
      // console.log('addShop data==' + JSON.stringify(data, null, 4));
      if (data['resultCode'] === 'SUCCESS') {
        this.router.navigate(['/organization/organizationInfo'])
      }
    })
  }
}
