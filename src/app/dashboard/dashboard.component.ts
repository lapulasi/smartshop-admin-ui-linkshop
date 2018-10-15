import {Component, OnInit} from '@angular/core';
import {DashboardService} from './dashboard.service';
import {Router} from '@angular/router';
import Chart from 'chart.js';
import {CustomTooltips} from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import {OrgService} from '../organization/orgService';
import {DatePipe} from '@angular/common';


Chart.defaults.global.pointHitDetectionRadius = 1;
Chart.defaults.global.tooltips.enabled = false;
Chart.defaults.global.tooltips.mode = 'index';
Chart.defaults.global.tooltips.position = 'nearest';
Chart.defaults.global.tooltips.custom = CustomTooltips;

@Component({
  templateUrl: './dashboard.component.html',
  styles: ['.query_label{float: right;padding: 0.5rem 1rem 0.5rem;} .red{color: red}']
})
export class DashboardComponent implements OnInit {
  brandList; // 品牌列表
  shopList; // 门店列表
  deviceList; // 设备列表

  recordIndex = 0;
  pageSize = 15;
  currPage = 1;
  totalItems;
  companyId = 0;
  endDate: any;
  startDate: any;
  now: any = Date.now();

  /*设备数*/
  dateAxis: Array<any> = []; // 日期
  deviceNum: Array<any> = [];  // 总数
  abnormalNum: Array<any> = []; // 异常

  /*人脸*/
  faceMsgCount: Array<any> = [];
  faceIllegalMsgCount: Array<any> = [];

  /*全景*/
  viewMsgCount: Array<any> = [];
  viewIllegalMsgCount: Array<any> = [];

  /*销量*/
  salesData: Array<any> = [];


  constructor(private service: DashboardService, private router: Router,
              private orgService: OrgService,
              private datePipe: DatePipe) {
  }

  ngOnInit() {
    this.endDate = this.datePipe.transform(this.now, 'yyyy-MM-dd');
    this.startDate = this.datePipe.transform(new Date(new Date().getTime() - 24 * 3600 * 1000 * 6), 'yyyy-MM-dd')
    const currentUser = localStorage.getItem('currentUser');

    if (currentUser) {
      this.companyId = JSON.parse(currentUser).companyId;
    }
    this.deviceData();
    this.getDeviceData();
    this.getFaceData();
    this.getSalesData();
  }

  getDeviceData() {
    this.orgService.getDevice({
      startDate: this.startDate,
      endDate: this.endDate
    }).subscribe(data => {
      // console.log(JSON.stringify(data, null, 4));
      for (let i = 0, len = data.length; i < len; i++) {
        const totalNum = data[i].abnormalNum + data[i].normalNum;
        this.deviceNum.push(totalNum);
        this.abnormalNum.push(data[i].normalNum);
        this.dateAxis.push(data[i]._id)
      }
      this.drawDevice();
    })
  }

  drawDevice() {
    const cardChart1 = new Chart($('#card-chart1'), {
      type: 'line',
      data: {
        labels: this.dateAxis,
        datasets: [{
          label: '设备数',
          backgroundColor: 'transparent',
          borderColor: 'rgba(255,255,255)',
          pointBackgroundColor: 'rgba(255,255,255)',
          data: this.deviceNum
        },
          {
            label: '正常设备数',
            backgroundColor: 'transparent',
            borderColor: 'rgba(254,83,8)',
            pointBackgroundColor: 'rgba(254,83,8)',
            data: this.abnormalNum
          }]
      },
      options: {
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            gridLines: {
              color: 'transparent',
              zeroLineColor: 'transparent'
            },
            ticks: {
              fontSize: 2,
              fontColor: 'transparent'
            }
          }],
          yAxes: [{
            display: false,
            ticks: {
              display: false,
              min: Math.min(...this.abnormalNum),
              max: Math.max(...this.deviceNum) + 20
            }
          }]
        },
        elements: {
          line: {
            borderWidth: 1
          },
          point: {
            radius: 3,
            hitRadius: 10,
            hoverRadius: 4
          }
        }
      }
    }); // eslint-disable-next-line no-unused-vars
  }

  getFaceData() {
    this.orgService.getFace({
      startDate: this.startDate,
      endDate: this.endDate
    }).subscribe(data => {
      // console.log(JSON.stringify(data, null, 4));
      for (let i = 0, len = data.length; i < len; i++) {
        if (data[i].type === 'IN') {
          this.faceMsgCount.push(data[i].msgCount);
          this.faceIllegalMsgCount.push(data[i].msgCount - data[i].illegalMsgCount);
        } else if (data[i].type === 'VIEW') {
          this.viewMsgCount.push(data[i].msgCount);
          this.viewIllegalMsgCount.push(data[i].msgCount - data[i].illegalMsgCount);
        }

      }
      this.drawFace();
      this.drawView();
    })
  }

  drawFace() {
    const cardChart2 = new Chart($('#card-chart2'), {
      type: 'line',
      data: {
        labels: this.dateAxis,
        datasets: [{
          label: '消息总数',
          backgroundColor: 'transparent',
          borderColor: 'rgba(255,255,255)',
          pointBackgroundColor: 'rgba(255,255,255)',
          data: this.faceMsgCount
        }, {
          label: '正常消息数',
          backgroundColor: 'transparent',
          borderColor: 'rgba(254,83,8)',
          pointBackgroundColor: 'rgba(254,83,8)',
          data: this.faceIllegalMsgCount
        }]
      },
      options: {
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            gridLines: {
              color: 'transparent',
              zeroLineColor: 'transparent'
            },
            ticks: {
              fontSize: 2,
              fontColor: 'transparent'
            }
          }],
          yAxes: [{
            display: false,
            ticks: {
              display: false,
              min: Math.min(...this.faceIllegalMsgCount),
              max: Math.max(...this.faceMsgCount) + 100
            }
          }]
        },
        elements: {
          line: {
            tension: 0.00001,
            borderWidth: 1
          },
          point: {
            radius: 3,
            hitRadius: 10,
            hoverRadius: 4
          }
        }
      }
    }); // eslint-disable-next-line no-unused-vars
  }

  drawView() {
    const cardChart3 = new Chart($('#card-chart3'), {
      type: 'line',
      data: {
        labels: this.dateAxis,
        datasets: [{
          label: '消息总数',
          backgroundColor: 'transparent',
          borderColor: 'rgba(255,255,255)',
          pointBackgroundColor: 'rgba(255,255,255)',
          data: this.viewMsgCount
        }, {
          label: '正常消息数',
          backgroundColor: 'transparent',
          borderColor: 'rgba(134,3,175)',
          pointBackgroundColor: 'rgba(134,3,175)',
          data: this.viewIllegalMsgCount
        }]
      },
      options: {
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            gridLines: {
              color: 'transparent',
              zeroLineColor: 'transparent'
            },
            ticks: {
              fontSize: 2,
              fontColor: 'transparent'
            }
          }],
          yAxes: [{
            display: false,
            ticks: {
              display: false,
              min: Math.min(...this.viewIllegalMsgCount),
              max: Math.max(...this.viewMsgCount)+100
            }
          }]
        },
        elements: {
          line: {
            tension: 0.00001,
            borderWidth: 1
          },
          point: {
            radius: 3,
            hitRadius: 10,
            hoverRadius: 4
          }
        }
      }
    }); // eslint-disable-next-line no-unused-vars
  }

  getSalesData() {
    this.orgService.getSales({
      startDate: this.startDate,
      endDate: this.endDate
    }).subscribe(data => {
      // console.log(JSON.stringify(data, null, 4));
      for (let i = 0, len = data.length; i < len; i++) {
        this.salesData.push(data[i].amount);
      }
      this.drawSale();
    })
  }

  drawSale() {
    const cardChart4 = new Chart($('#card-chart4'), {
      type: 'bar',
      data: {
        labels: this.dateAxis,
        datasets: [{
          label: '销量',
          backgroundColor: 'rgba(255,255,255,.6)',
          borderColor: 'rgba(255,255,255,.6)',
          data: this.salesData
        }]
      },
      options: {
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: false,
            barPercentage: 0.6
          }],
          yAxes: [{
            display: false
          }]
        }
      }
    }); // Random Numbers
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
    this.orgService.dashbroad().subscribe(data => {
      // console.log(JSON.stringify(data, null,4))
      this.deviceList = data;
      this.totalItems = data.length;
    });
  }


}
