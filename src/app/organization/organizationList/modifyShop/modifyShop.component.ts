import {Component, OnInit} from '@angular/core';
import {OrganizationService} from '../../organization.service';
import {OrgService} from "../../orgService";
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  templateUrl: './modifyShop.html',
  styles: ['.shopImg{width: 400px; height: 280px; margin:30px auto;}' +
  '.textLeft{text-align:left}']
})
export class ModifyShopComponent implements OnInit {
  sub: any;
  //parentName: any;
  level: any;
  id: any;
  storeName: any;
  storeId: any;
  workTime: any;
  brandList: any;//卖场品牌
  brandNameList: any;//卖场名称
  storeBrand: any;
  brandName: any;
  companyId: any;
  channelName: any;
  shopArea: any;
  staffNum: any;
  address: any;
  districtCode: any;
  isBroken: any;
  geoLng: any = 0;
  geoLat: any = 0;
  cityDistrict: any;

  constructor(private route: ActivatedRoute,
              private service: OrganizationService,
              private orgService: OrgService,
              private router: Router) {
  }

  ngOnInit() {
    this.sub = this.route.queryParams.subscribe(params => {
      this.storeName = params['name'];
      this.id = params['parentOrgId'];
      this.companyId = params['companyId'];
      this.getShop();
    })
    // this.getChannelList();
  }

  getChannelList() {
    this.service.getChannelList().then(data => {
      // console.log(JSON.stringify(data, null, 4));
      if (data.resultCode === 'SUCCESS') {
        this.brandList = data.resultData;

      }
    })
  }

  getShop() {
    this.orgService.getShop(this.id).subscribe(data => {
      // console.log(JSON.stringify(data, null, 4));
      if (data !== null) {
        this.storeName = data.orgObj.name;
        // this.channelName = data.orgObj.company.name
        this.storeBrand = data.shopGrade;
        this.shopArea = data.shopArea;
        this.workTime = data.businessHours;
        this.staffNum = data.staffNum;
        this.address = data.address;
        this.isBroken = data.broken;
        this.getGeoCode();
      }

    });
  }

  getGeoCode() {
    if (this.address !== '' && this.address !== null && this.address !== undefined) {
      this.getGeo();
    }
  }

  getDistrictCode() {
    this.orgService.getDistrictCode(this.cityDistrict).subscribe(data => {
      // console.log(JSON.stringify(data, null, 4));
      this.districtCode = data.districts[0].adcode;
    })
  }

  getGeo() {
    this.orgService.getGeoCode(this.address).subscribe(data => {
      // console.log(JSON.stringify(data, null, 4));
      const address = data.geocodes[0].location.split(',')
      this.geoLng = address[0];
      this.geoLat = address[1];
      this.cityDistrict = data.geocodes[0].district;
      this.getDistrictCode();
    })
  }

  onStoreBrandChange(event) {
    // console.log(event);
    this.storeBrand = event;
    this.getBrandNameList(event);
  }

  getBrandNameList(event) {
    for (let i = 0, len = this.brandList.length; i < len; i++) {
      // console.log(typeof event + ';;' + typeof this.brandList[i].channelTypeId)
      if (parseInt(event) === this.brandList[i].channelTypeId) {
        this.brandNameList = this.brandList[i].channels;
      }
    }
  }

  onBrandNameChange(event) {
    this.brandName = event;
  }

  updateShop() {
    this.orgService.updateShop(this.id, {
      name: this.storeName,
      districtCode: this.districtCode,
      channelType: this.channelName,
      shopGrade: this.storeBrand,
      isBroken: this.isBroken,
      shopArea: this.shopArea,
      staffNum: this.staffNum,
      businessHours: this.workTime,
      address: this.address,
      lng: this.geoLng,
      lat: this.geoLat,
    }).subscribe(data => {
      // console.log(data)
      if (data.content === 'SUCCESS') {
        this.router.navigate(['/organization/organizationInfo'])
      }
    })
  }
}
