import {Component, OnInit} from '@angular/core'
import {UserLogsService} from "../userLogs.service";
import {Contant} from "../../common/Contant";
import {OrgService} from "../../organization/orgService";

@Component({
  templateUrl: './eventViews.html'
})

export class EventViewsComponent implements OnInit {
  userId: any;
  eventName: any;
  startDate: any;
  endDate: any;

  pageSize = 15;
  currPage = 1;
  totalItems;
  eventInfo: any;
  page: any = 0;

  imgPrefix: any;
  userInfo: any;

  constructor(private service: UserLogsService,
              private contant: Contant,
              private orgService: OrgService) {
    this.imgPrefix = contant.imgPrefix;
  }

  ngOnInit() {

  }

  handler(event) {
    // console.log(JSON.stringify(event, null, 4));
    this.userId = event.userId;
    this.eventName = event.eventName;
    this.startDate = event.startDate;
    this.endDate = event.endDate;
    this.checkOut();
  }

  pageChanged(event) {
    this.page = event.page - 1;
    this.checkOut();
  }

  checkOut() {
    this.service.getUserEventList({
      userId: this.userId === undefined ? 0 : this.userId,
      eventName: this.eventName === undefined ? '' : this.eventName,
      startDate: this.startDate,
      endDate: this.endDate,
      page: this.page
    }).subscribe(data => {
      // console.log(JSON.stringify(data, null, 4))
      this.eventInfo = data.content;
      this.totalItems = data.totalElements
    })
  }

  getUserInfo(staticModal, id) {
    this.orgService.getUserInfo({
      userId: id === undefined ? 0 : id,
      page: 0
    }).subscribe(data => {
      // console.log(JSON.stringify(data, null, 4))
      this.userInfo = data.content;
      if (this.userInfo.length > 0) {
        staticModal.show();
      } else {
        alert('查无此人！')
      }
    })
  }
}
