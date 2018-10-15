import {Component, Input, Output, EventEmitter} from '@angular/core';
import {DatePipe} from '@angular/common';
import {UserLogsService} from "../userLogs.service";
import {OrgService} from "../../organization/orgService";

@Component({
  selector: 'app-userlog-common',
  templateUrl: './common.html'
})

export class CommonComponent {
  organizationName: any;
  currentIndex: any;
  companyId: any;
  orgCode: any;

  pageName: any;
  eventName: any;
  pageNameList: Array<any> = ['首页',
    '简报',
    '热力图-时段对比',
    '热力图-门店对比',
    '热力图',
    '详情',
    '排行榜',
    '零售参谋',
    '客流表现',
    '销售表现',
    '门店表现',
    '客流趋势',
    '销售趋势',
    '门店趋势',
    '客流参谋',
    '销售参谋',
    '门店参谋'
  ];
  eventNameList: Array<any> = ['checkIssueShop',
    'switchLevel',
    'switchDataType',
    'login',
    'salesTrend',
    'storeTrend',
    'coustomerTrend',
    'salesReport',
    'mine',
    'home_back',
    'webView_back',
    'dataDetail_back',
    'dataDetail_regional',
    'switchOrg_selectedOrg',
    'inspectShop', // 巡店
    'viewVideo'
  ]

  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();

  startDate: any;
  endDate: any;

  userId: any;
  userInfo: any;

  @Input() isPageView: Boolean = true;
  @Output() changeEvent = new EventEmitter();

  constructor(private service: UserLogsService, private datePipe: DatePipe,
              private orgService: OrgService) {
    this.bsValue.setDate(this.bsValue.getDate() - 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];
  }

  onPageChange(event) {
    this.pageName = event;
  }

  onEventChange(event) {
    this.eventName = event;
  }

  getTimeRange() {
    this.startDate = this.datePipe.transform(this.bsRangeValue[0], 'yyyy-MM-dd');
    this.endDate = this.datePipe.transform(this.bsRangeValue[1], 'yyyy-MM-dd');
  }

  query() {
    this.getTimeRange();
    const requestInfo = {
      'userId': this.userId,
      'startDate': this.startDate,
      'endDate': this.endDate,
      'pageName': this.pageName,
      'eventName': this.eventName,
    };
    this.changeEvent.emit(requestInfo);
  }

}
