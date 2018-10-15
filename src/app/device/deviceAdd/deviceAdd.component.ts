import {Component, OnInit, ViewChild} from '@angular/core';
import { DeviceService } from '../device.service';
import {Device} from '../classes/Device';
import {ModalDirective} from 'ngx-bootstrap';
import {Router} from '@angular/router';

@Component({
  templateUrl: './deviceAdd.html',
  styles: [`.tips-color{color: #bd4147;}`]
})
export class DeviceAddComponent implements OnInit {

  brandList; // 品牌列表
  shopList; // 门店列表
  versionList; // 系统版本列表
  @ViewChild('staticModal') public staticModal: ModalDirective;

  dv = new Device(0, '', 0, 0, 0, '', '', '', '');
  constructor(private service: DeviceService, private route: Router) {}

  ngOnInit() {
    this.brandData();
    this.shopData();
    this.versionData();
  }

  toListPage() {
    this.route.navigate(['/device/deviceVersion']);
  }

  submitForm() {
    this.service.insertDevice(this.dv).then(data => {
      if (data.resultCode === 'SUCCESS') {
        this.staticModal.show();
      }
    })
  }
  closeModal() {
    this.staticModal.hide()
    this.dv = new Device(0, '', 0, 0, 0, '', '', '', '');
  }

  onBrandChange(event) {
    this.dv.brandId = event;
    this.shopData();
  }

  brandData() {
    this.service.listBrand().then(data => {
      this.brandList = data;
    });
  }

  shopData() {
    this.service.listShop({brandId : this.dv.brandId}).then(data => {
      this.shopList = data;
    });
  }

  versionData() {
    this.service.listDeviceVersion().then(data => {
      this.versionList = data;
    });
  }


}
