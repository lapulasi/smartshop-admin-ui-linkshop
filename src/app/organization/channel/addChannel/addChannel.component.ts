import {Component, OnInit} from '@angular/core';
import {OrganizationService} from '../../organization.service';
import {Router, ActivatedRoute} from '@angular/router';
import {ThreeLink} from '../../../common/ThreeLink';

@Component({
  templateUrl: './addChannel.html'
})
export class AddChannelComponent implements OnInit {

  allData;                         // 存储所有的省市区数据
  provinces;                    // 存储省的信息
  citys;                       // 存储城市的信息
  areas;                         // 存储地区的信息
  provinceValue: string;
  cityValue: string;                               // 重置城市选择器时用到的变量
  areaValue: string;                             // 重置地区选择器时用到的变量
  provinceIndex;
  cityIndex;
  areaIndex;


  channelBrand;
  channelBrandId; // 渠道品牌id
  channelName;
  province: any;
  city: any;
  area: any;
  address: any;

  center: any;
  zoom: any;

  constructor(private service: OrganizationService,
              private threeLink: ThreeLink,
              private router: Router) {
  }

  ngOnInit() {
    this.getChannelBrand();
    this.allData = this.threeLink.cityJson;
    console.log('this.allData.length==' + this.allData.length);
    this.setProvinces();
  }

  // 获取地址信息
  changeEvent(event: any) {
    this.center = event.center;
    this.province = event.province;
    this.city = event.city;
    this.area = event.district;
    this.address = event.address;
    this.zoom = event.zoom;
  }

  setProvinces() {
    if (this.allData !== undefined) {
      const result = new Array<object>();
      for (let i = 0; i < this.allData.length; i++) {
        const value = this.allData[i];
        if (value['item_code'].slice(2, 6) === '0000') {
          result.push(value);
        }
      }
      this.provinces = result;
      console.log('provices.length==' + this.provinces.length);
      // return result;
    }
  }

  setCity(province: string) {
    if (this.allData !== undefined) {
      const result = new Array();
      for (let i = 0; i < this.allData.length; i++) {
        const value = this.allData[i];
        if (value['item_code'].slice(0, 2) === province.slice(0, 2)
          && value['item_code'] !== province && value['item_code'].slice(4, 6) === '00') {
          result.push(value);
        }
      }
      // return result;
      this.citys = result;
      console.log('citys.length==' + this.citys.length);
    }
  }

  setArea(city: string) {
    if (this.allData !== undefined) {
      const result = [];
      for (let i = 0; i < this.allData.length; i++) {
        const value = this.allData[i];
        if (value['item_code'] !== city && value['item_code'].slice(0, 4) === city.slice(0, 4)) {
          result.push(value);
        }
      }
      // return result;
      this.areas = result;
      console.log('areas.length==' + this.areas.length);
    }
  }

  selectProvince(code) {
    this.cityValue = 'undefined';
    this.areaValue = 'undefined';
    this.provinceIndex = code;
    this.setCity(this.provinces[code].item_code);
    // this.provinceValue = this.provinces[code].item_name;
  }

  selectCity(code) {
    this.areaValue = 'undefined';
    this.setArea(this.citys[code].item_code);
    this.cityIndex = code;
    // this.areaValue = this.citys[code].item_name;
  }

  selectArea(code) {
    this.areaIndex = code;
  }

  onChannelBrandChange(event) {
    this.channelBrandId = event;
  }

  getChannelBrand() {
    this.service.getChannelBrand().then(data => {
      if (data.resultCode === 'SUCCESS') {
        this.channelBrand = data.resultData;
      }
    })
  }

  query() {
    this.service.addChannel({
      channelTypeId: this.channelBrandId,
      channelName: this.channelName,
      // province: this.provinces[this.provinceIndex].item_name,
      // city: this.citys[this.cityIndex].item_name,
      // area: this.areas[this.areaIndex].item_name,
      province: this.province,
      city: this.city,
      area: this.area,
      address: this.address,
      geoCoord: this.center,
      zoom: this.zoom
    }).subscribe(data => {
      if (data['resultCode'] === 'SUCCESS') {
        this.router.navigate(['organization/channel']);
      }
    })
  }
}
