import {Component, OnInit} from '@angular/core';
import {DeviceService} from '../device.service';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  templateUrl: './deviceDetail.html',
  styleUrls: ['./deviceDetail.css']
})
export class DeviceDetailComponent implements OnInit {
  deviceUid: any;
  status;

  deviceList: any;

  constructor(private service: DeviceService, private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.deviceUid = params['uid'];
      this.status = params['status'];

      if (this.status === '1') {
        this.searchDevice();
      }
    })
  }

  searchDevice() {

    this.service.pagingDevice({
      //orgId: '',
      deviceUId: this.deviceUid,
      page: 0
    }).subscribe(data => {

      this.deviceList = data.content;
    });
  }

}
