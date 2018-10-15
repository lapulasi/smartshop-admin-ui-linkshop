import {Component, OnInit} from '@angular/core';
import {OrganizationService} from '../../organization.service';
import {OrgService} from "../../orgService";
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  templateUrl: './addOrganization.html'
})
export class AddOrganizationComponent implements OnInit {

  sub: any;
  orgId: any;
  orgName: any;
  parentName: any;
  companyId: any;
  geoCoord: any;
  boundry: any;
  zoom: any;
  districtName: any;
  levelId: any;
  orgLevel: any;
  address: any;
  isOrgRoot: boolean = false;
  isOrgLevel: boolean = true;
  adcode: any;
  isAddShop: boolean = false; // 是否为添加店铺

  constructor(private service: OrganizationService,
              private router: Router,
              private route: ActivatedRoute,
              private orgService: OrgService) {
  }

  ngOnInit() {
    this.sub = this.route.queryParams.subscribe(params => {
      this.parentName = params['name'];
      this.companyId = params['companyId'];
      this.levelId = params['levelId'];
      this.isOrgRoot = params['isOrgRoot'];
      if (this.isOrgRoot) {
        this.orgLevel = 1;
        this.orgId = 0;
        alert('当前为根组织，请先前往组织层级设置层级！')
      } else {
        this.orgId = params['parentOrgId'];
        this.getOrgLevel();
      }
      // console.log('this.parentName=' + this.parentName + '//this.orgId==' + this.orgId + '//this.levelId==' + this.levelId);
    })
    // console.log(this.address)

  }

  getGeoCode() {
    if (this.address !== '' && this.address !== null && this.address !== undefined) {
      this.getGeo();
    }
  }

  getGeo() {
    this.orgService.getGeoCode(this.address).subscribe(data => {
      // console.log(JSON.stringify(data, null, 4))
      this.geoCoord = data.geocodes[0].location;
      this.adcode = data.geocodes[0].adcode;
    })
  }

  getOrgLevel() {
    this.orgService.getOrgLevel(this.levelId).subscribe(data => {
      // console.log(JSON.stringify(data, null, 4));
      // console.log(data === null);
      if (data === null) {
        // this.isOrgLevel = false;
        alert('当前组织还没有子组织，请先前往组织层级设置！');
        this.router.navigate(['/organization/level'])
      } else {
        this.orgLevel = data.level;
        this.isAddShop = data.shop;
      }

    })
  }

  /*pointChange(event: any) {
    this.geoCoord = event.geo;
    this.boundry = event.boundaryPoints;
    this.zoom = event.zoom;
    this.districtName = event.districtName;
  }*/


  addOrgan() {
    this.orgService.creatOrganization({
      name: this.orgName,
      parentId: this.orgId,
      companyId: this.companyId,
      adcode: this.adcode,
      lng: this.geoCoord.split(',')[0],
      lat: this.geoCoord.split(',')[1],
      /*boundry: this.boundry,
      zoom: this.zoom,
      districtName: this.districtName*/
    }).subscribe(data => {
      console.log(data);
      if (data) {
        if (!this.isAddShop) {
          this.router.navigate(['/organization/organizationInfo'])
        } else if (this.isAddShop) {
          this.router.navigate(['/organization/organizationInfo/modifyShop'], {queryParams:{'name':this.parentName,'parentOrgId':data['content'].id,'companyId':this.companyId}})
        }

      }
    })
  }
}
