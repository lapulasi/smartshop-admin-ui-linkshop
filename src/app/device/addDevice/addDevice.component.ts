import {Component, OnInit, ViewChild} from '@angular/core';
import {DeviceService} from '../device.service';
import {Device} from '../classes/Device';
import {ModalDirective} from 'ngx-bootstrap';
import {Router} from '@angular/router';

@Component({
  templateUrl: './addDevice.html',
  styles: [`.tips-color{color: #bd4147;}`]
})
export class AddDeviceComponent implements OnInit {

  deviceTypeList = [
    {name: '海康IPC', value: 'HIK_VIEW'},
    {name: '海康人脸抓拍机', value: 'HIK_FACE'},
    {name: 'Firs头肩计数器', value: 'FIRS_HEAD'}
  ];
  hikFace: Array<any> = ['DS-2CD7A27FWD', 'F-LZS'];
  hikView: Array<any> = ['CS-C6C-1080P'];
  firsHead: Array<any> = ['DS200-24']

  deviceTypeModel: any;
  companyId: any;
  companyModel: any;
  organizationName: any;

  deviceName: any;
  deviceNumber: any;

  deviceType: any;
  deviceModel: any;
  hikViewModel: any;
  firsHeadModel: any;
  hikFaceModel: any;
  shopId: any;
  hikViewSerial: any;
  hikFaceSerial: any;
  firsHeadSerial: any;
  validateCode: any;

  constructor(private service: DeviceService, private route: Router) {
  }

  ngOnInit() {
    // this.deviceTypeModel = 'HIK_VIEW';
    this.deviceType = 'HIK_VIEW'
  }

  onTypeChange(event) {
    this.deviceType = event;
    this.clearParams();
  }

  getCompanyInfo(event, staticModal) {
    const currentIndex = event.currentIndex;
    if (currentIndex === undefined) {
      return;
    } else {
      staticModal.show();
      this.companyId = event.id;
      this.companyModel = event.companyModel
    }
  }

  getOrgInfo(event) {
    this.shopId = event._id;
    this.organizationName = event.name;
  }

  onHikViewChange(event) {
    this.deviceModel = event;
  }

  onHikFaceChange(event) {
    this.deviceModel = event;
  }

  onFirsHeadChange(event) {
    this.deviceModel = event;
  }

  clearParams() {
    this.validateCode = '';
    this.deviceName = '';
    this.deviceNumber = '';
  }

  addDevice() {
    if (this.shopId === null || this.shopId === undefined) {
      alert('请选择店铺')
    } else {
      let tempSeries;
      if (this.deviceType === 'HIK_VIEW') {
        tempSeries = this.hikViewSerial;
      } else if (this.deviceType === 'HIK_FACE') {
        tempSeries = this.hikFaceSerial;
      } else if (this.deviceType === 'FIRS_HEAD') {
        tempSeries = this.firsHeadSerial;
      }
      this.service.addDevice(this.shopId, this.deviceType, this.deviceModel, tempSeries, this.validateCode, this.deviceName, this.deviceNumber).subscribe(data => {
        console.log(JSON.stringify(data, null, 4))
        if (data.resultCode === 'SUCCESS') {
          alert('添加成功！');
        } else {
          alert(data.errorMsg);
        }
      })
    }

  }

}
