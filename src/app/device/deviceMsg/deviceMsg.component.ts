import { Component, OnInit } from '@angular/core';
import { DeviceService } from '../device.service';
import { Contant } from '../../common/Contant';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  templateUrl: './deviceMsg.html',
  styles: ['.query_label{float: right;padding: 0.5rem 1rem 0.5rem;}']
})
export class DeviceMsgComponent  implements OnInit {

  imgPrefix;
  deviceUID = 'RXGEUPT7JRKYLK26111A';
  msgs;
  totalItems;

  pageRequest = {
      page: 0,
      size: 15
  };


  constructor(private deviceService: DeviceService, private contant: Contant, private router: Router, private route: ActivatedRoute) {
    this.imgPrefix = contant.imgPrefix;
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.deviceUID = params['uid'];
      // console.log('this.deviceUid==' + this.deviceUid)
    })

    this.queryMsg();
  }

  queryMsg() {
    this.deviceService.pagingDeviceMsg({
        deviceUID : this.deviceUID,
        page : this.pageRequest.page,
        size : this.pageRequest.size
    }).then(data => {
        this.totalItems = data.totalElements;
        this.msgs = data.content;
        // console.log(JSON.stringify(data, null, 4));
    });
  }

  pageChanged(event) {
    this.pageRequest.page = event.page - 1;
    //console.log('query page:', this.pageRequest.page);
    this.queryMsg();
  }



//   guestData() {
//     this.guestService.pagingGuest({
//       companyId: this.company,
//       shopId: this.shopModel,
//       recordIndex: this.recordIndex,
//       pageSize: this.pageSize
//     }).then(data => {
//       this.guestList = data.dataList;
//       this.totalItems = data.totalNum;
//       // console.log(this.guestList);
//       // debugger;
//     });
//   }

}
