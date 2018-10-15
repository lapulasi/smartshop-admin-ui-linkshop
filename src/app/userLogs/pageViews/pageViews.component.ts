import {Component, OnInit} from '@angular/core'
import {UserLogsService} from "../userLogs.service";
import {Contant} from "../../common/Contant";
import {OrgService} from "../../organization/orgService";

@Component({
  templateUrl: './pageViews.html'
})

export class PageViewsComponent implements OnInit {
  userId: any;
  pageName: any;
  startDate: any;
  endDate: any;

  pageSize = 15;
  currPage = 1;
  totalItems;
  pageInfo: any;
  page: any = 0;
  imgPrefix: any;
  userInfo: any;

  currUserId: any; // 列表点击的当前id
  staticModal: any;

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
    this.pageName = event.pageName;
    this.startDate = event.startDate;
    this.endDate = event.endDate;
    this.staticModal = event.staticModal;
    this.checkOut();
  }

  pageChanged(event) {
    this.page = event.page - 1;
    this.checkOut();
  }

  checkOut() {
    this.service.getUserPageList({
      userId: this.userId === undefined ? 0 : this.userId,
      pageName: this.pageName === undefined ? '' : this.pageName,
      startDate: this.startDate,
      endDate: this.endDate,
      page: this.page
    }).subscribe(data => {
      // console.log(JSON.stringify(data, null, 4))
      this.pageInfo = data.content;
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
