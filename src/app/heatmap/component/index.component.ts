import {
  Component, ComponentFactoryResolver, OnChanges, OnInit, SimpleChanges, ViewChild,
  ViewContainerRef
} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HeatMapService} from '../heat-map.service';
import {Observable} from 'rxjs/Observable';
import {TimepickerConfig} from 'ngx-bootstrap';
import {DateTimeFormatter, LocalDate, LocalDateTime, LocalTime} from 'js-joda';
import {DatePipe} from '@angular/common';
import {HeatMapComponent} from './heat-map.component';


export function getTimepickerConfig(): TimepickerConfig {
  return Object.assign(new TimepickerConfig(), {
    hourStep: 1,
    showMeridian: false,
    readonlyInput: false,
    mousewheel: true,
    showMinutes: false,
    showSeconds: false
  });
}

@Component({
  template: `
    <div class="row">
        <div class="col-sm-1">
          <label class="query_label">公司：</label>
        </div>
        <div class="form-group col-sm-2">
          <select class="form-control" [(ngModel)]="company" (ngModelChange)="onCompanyChange($event)" placeholder="公司名">
            <option value=""></option>
            <option *ngFor="let i of companyList; index as currIndex" [ngValue]="i">{{i.name}}</option>
          </select>
        </div>
    </div>
    <div class="row">
        <div class="col-sm-1">
          <label class="query_label">门店：</label>
        </div>
        <div class="form-group col-sm-2">
          <select class="form-control" [(ngModel)]="shop" (ngModelChange)="onShopChange($event)" placeholder="门店名">
            <option value=""></option>
            <option *ngFor="let i of shopList$ | async;" [ngValue]="i" >{{i.orgObj.name}}</option>
          </select>
      </div>
    </div>
    <div class="container-fluid">
      <ng-container *ngFor="let row of heatMapParamsList2">
        <div class="row">
          <app-heat-map-wrapper *ngFor="let param of row" [org]="param.orgId" [shopId]="param.shopId"
                                [shopName]="param.shopName" (onClose)="onClose($event)">
          </app-heat-map-wrapper>
        </div>
      </ng-container>
    </div>
  `,
  providers : [{ provide: TimepickerConfig, useFactory: getTimepickerConfig }],
  entryComponents: [HeatMapComponent]
})

export class IndexComponent implements OnInit {

  company;
  shop;

  companyList: any;
  shopList$: Observable<any>;

  showDate1 = false;
  showDate2 = false;
  startDate: Date = new Date();
  endDate: Date = new Date();
  startTime: Date = new Date(new Date().getTime() - 3600000);
  endTime: Date = new Date();

  heatMapParamsList:Array<HeatMapParam> = [];
  heatMapParamsList2:Array<Array<HeatMapParam>> = [];

  org;
  shopId;


  constructor(
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private heatMapService: HeatMapService,
    private componentFactoryResolver: ComponentFactoryResolver) {
  }

  ngOnInit() {
    this.companyList = this.route.snapshot.data.companyList.content;
  }


  onCompanyChange(event) {
    this.shopList$ = this.heatMapService.getShopsByOrgCode(event.id);
  }

  onShopChange(event) {

    this.heatMapParamsList.push({shopId:this.shop.id,
      orgId:this.company.id,shopName:this.company.name + '-' + this.shop.orgObj.name});
    this._update();

  }

  _update(): void {
    this.heatMapParamsList2 = [];
    const col = 2;
    for(let i = 0;i<this.heatMapParamsList.length;i+=2) {
      this.heatMapParamsList2.push(this.heatMapParamsList.slice(i,i+2));
    }
  }

  getFormatDate(date: any) {
    return LocalDate.of(
      Number(this.datePipe.transform(date, 'yyyy')),
      Number(this.datePipe.transform(date, 'MM')),
      Number(this.datePipe.transform(date, 'dd')));
  }

  getFormatTime(time: any) {
    return LocalTime.of(Number(this.datePipe.transform(time, 'HH')));
  }

  onClose($event:HeatMapParam): void {
    const index = this.heatMapParamsList.findIndex(value => value.shopId === $event.shopId);
    this.heatMapParamsList.splice(index,1);
    this._update();
  }
}

interface HeatMapParam {
  shopName:string;
  shopId:Number;
  orgId: Number;
}
