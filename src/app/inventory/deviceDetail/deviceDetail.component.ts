import {Component, OnInit} from '@angular/core';
import {InventoryService} from '../inventory.service';
import {environment} from '../../../environments/environment';

@Component({
  templateUrl: './deviceDetail.html',
  styles: []
})
export class DeviceDetailComponent implements OnInit {
  private url = environment.service_url;
  batchNo: String = '201801';
  cameraType: any;
  outBound: any;
  installation: any;
  deviceUId: any;
  company: any;
  city: any;
  broken: any;

  recordIndex = 0;
  pageSize = 15;
  currPage = 0;
  totalItems;
  deviceDetailList: any;

  excel_url: any;

  remark: any;

  uid: any; // 编辑时候点击位置的uid

  constructor(private service: InventoryService) {
  }


  ngOnInit() {

  }

  pageChanged(event) {
    // console.log(event)
    this.currPage = event.page - 1;
    this.check();
  }

  check() {
    // console.log(this.batchNo);
    this.service.deviceDetail({
      batchNo: this.batchNo,
      cameraType: this.cameraType === '' ? null : this.cameraType,
      status: this.outBound,
      isInstall: this.installation,
      uid: this.deviceUId,
      page: this.currPage,
      company: this.company,
      city: this.city,
      isBroken: this.broken
    }).then(data => {
      // console.log(JSON.stringify(data, null, 4));
      this.deviceDetailList = data.content;
      this.totalItems = data.totalElements;
      // console.log(this.totalItems)
    })
  }

  compare() {
    this.service.compare().then(data => {
      console.log(JSON.stringify(data, null, 4));
      if (data.resultCode === 'SUCCESS') {
        alert('同步成功！');
      } else {
        alert(data.errorMsg);
      }
    })
  }

  exportExcel() {
    this.excel_url = this.service.exportExcel({
      batchNo: this.batchNo,
      cameraType: this.cameraType === '' ? null : this.cameraType,
      status: this.outBound,
      isInstall: this.installation,
      uid: this.deviceUId,
      company: this.company,
      city: this.city
    })
    window.location.href = this.excel_url;
  }

  editeRemark(index, staticModal) {
    staticModal.show();
    this.uid = this.deviceDetailList[index].uid;

  }

  changeRemark(staticModal) {
    console.log(this.uid + ';;' + this.remark)
    this.service.editeRemark({
      uid: this.uid,
      remark: this.remark
    }).then(data => {
      console.log(JSON.stringify(data, null, 4));
      if (data.resultCode === 'SUCCESS') {
        staticModal.hide();
        this.check();
      } else {
        alert(data.errorMsg);
      }
    })
  }
}
