import {Component} from '@angular/core';
import {DeviceService} from '../device.service';
import {Router} from '@angular/router';

@Component({
  templateUrl: './deviceList.html',
  styles: ['.query_label{float: right;padding: 0.5rem 1rem 0.5rem;}']
})
export class DeviceInfoComponent {
  deviceList; // 设备列表

  companyModel;
  deviceUId = '';
  shopName;
  recordIndex = 0;
  pageSize = 15;
  currPage = 1;
  totalItems;

  companyList: any;
  companyId: any;
  companyName: any;
  treeData: any;

  organizationName;
  organizationId;


  constructor(private service: DeviceService, private router: Router) {
  }

  companyData() {
    this.service.listCompany().then(data => {
      this.companyList = data;
    });
  }

  onCompanyChange(event, staticModal) {
    if (this.companyModel !== '') {
      this.companyId = this.companyList[event].id;
      this.companyName = this.companyList[event].name;
      staticModal.show();
    }
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
    /*console.log(event);
    console.log('----- ==' + this.companyModel);*/
  }

  getOrgInfo(event) {
    this.organizationName = event.name;
    this.organizationId = event._id;
  }

  pageChanged(event) {
    this.currPage = event.page;
    this.recordIndex = (this.currPage - 1) * this.pageSize;
    if (this.currPage === 1) {
      this.recordIndex = 0;
    }
    this.deviceData();
  }

  deviceData() {
    this.service.pagingDevice({
      orgId: this.organizationId,
      deviceUId: this.deviceUId,
      page: this.currPage - 1
    }).subscribe(data => {
      this.deviceList = data.content;
      this.totalItems = data.totalElements;
    });
  }

  deviceRemove(uid) {
    const conf = confirm('确认删除？');
    if (conf) {
      this.service.removeDevice(uid).subscribe(data => {
        if (data.result === 'success') {
          this.deviceData();
        } else {
          alert(data.result);
        }
      });
    }

  }


}
