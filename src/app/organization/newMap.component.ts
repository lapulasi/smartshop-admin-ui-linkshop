import {Component, OnInit} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {escape} from "querystring";
declare var BMap: any;

@Component({
  template: `
  <select (change)="change($event, 'city')"><option *ngFor="let opt of provinces" [value]="opt.name">{{opt.name}}</option></select>省
  <select (change)="change($event, 'district')"><option *ngFor="let opt of citys" [value]="opt.name">{{opt.name}}</option></select>市
  <select (change)="change($event, 'buiness')"><option *ngFor="let opt of districts">{{opt.name}}</option></select>区
  <select><option *ngFor="let opt of buinesses">{{opt.name}}</option></select>商圈<br/>
  <p (click)="getProvince()">map</p>
  `
})
export class NewMapComponent implements OnInit {

  static subDistrictUrl = 'http://restapi.amap.com/v3/config/district?subdistrict=1&key=778e8bd7e977163d8b3ded18de20099c&s=rsv3&output=json&keywords=';
  name: any = '中国';
  type: any = 'province';

  province: any;
  provinces: any = [];
  citys: any = [];
  districts: any = [];
  buinesses: any = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.initProvince();

  }

  change(event, type) {
    this.name = event.target.value;
    this.type = type;

    console.log(this.name, this.type);
    this.initProvince();
  }

  initProvince() {
    const that = this;
    that.http.get<any>(NewMapComponent.subDistrictUrl + this.name).subscribe(data => {
      console.log(data);
      if (data.info === 'OK') {
        if (this.type === 'province') {
          this.provinces = data.districts[0].districts;
        }else if (this.type === 'city') {
          this.citys = data.districts[0].districts;
        }else if (this.type === 'district') {
          this.districts = data.districts[0].districts;
        }else if (this.type === 'buiness') {
          this.buinesses = data.districts[0].districts;
        }

      }
    });
  }


  // =====================================保存行政区域====================================
  // 获取省
  getProvince() {
    const that = this;
    that.getArea(that, '深圳市');
    // that.http.get<any>(NewMapComponent.subDistrictUrl + '中国').subscribe(data => {
    //   console.log(data);
    //   if (data.info === 'OK') {
    //     for (const obj of data.districts[0].districts){
    //       that.getCity(that, obj.name);
    //     }
    //   }
    // });
  }

  // 获取市
  getCity(that, name) {
    that.http.get(NewMapComponent.subDistrictUrl + name).subscribe(data => {
      if (data.info === 'OK') {
        for (const obj of data.districts[0].districts){
          that.getArea(that, obj.name);
        }
      }
    });
  }

  // 获取区
  getArea(that, name) {
    that.http.get(NewMapComponent.subDistrictUrl + name).subscribe(data => {
      if (data.info === 'OK') {
        const parentName = name;
        for (const obj of data.districts[0].districts){
          that.getBoundary(that, parentName, obj);
        }
      }
    });
  }

  // 获取行政区边界
  getBoundary(that, parentName, city) {
    console.log('------------', parentName, city.name);
    new BMap.Boundary().get(parentName + city.name, function(data){
      if (data.boundaries[0]) {
        that.saveBoundaries(that, city.name, parentName, city.adcode, data.boundaries);
      }
    });
  }

  // 保存数据
  saveBoundaries(that, name, parentName, code, boundaries) {
    console.log(parentName, name, code, boundaries);
    that.http.post('/map/boundaries', {name: name, parentName: parentName, code: code, boundaries: boundaries}).subscribe(data => {
    });
  }




}
