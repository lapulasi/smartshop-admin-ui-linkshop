import {Component, OnInit, ViewChild} from '@angular/core';
import { DeviceService } from '../device.service';
import {Device} from '../classes/Device';
import {ActivatedRoute, Router} from '@angular/router';
import {ModalDirective} from 'ngx-bootstrap';

@Component({
  templateUrl: './deviceUpdate.html',
  styles: [`.tips-color{color: #bd4147;}`]
})
export class DeviceUpdateComponent implements OnInit {

  brandList; // 品牌列表
  shopList; // 门店列表
  versionList; // 系统版本列表
  id; // 设备id
  @ViewChild('staticModal') public staticModal: ModalDirective;

  dv = new Device(0, '', 0, 0, 0, '', '', '', ''); // 传输数据到后台
  constructor(private service: DeviceService,
              private router: ActivatedRoute,
  private route: Router) {}
  ngOnInit() {
    this.dv = this.router.snapshot.data['deviceDetail'];
    this.brandData();
    this.shopData();
    this.versionData();
  }

  submitForm() {
    this.service.updateDevice(this.dv).then(data => {
      if (data.resultCode === 'SUCCESS') {
        this.staticModal.show();
      }
    })
  }
  closeModal() {
    this.staticModal.hide()
    this.route.navigate(['/device/deviceInfo']);
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

  deviceData(para) {
    this.service.getDevice(para).then(data => {

    })
  }


}
