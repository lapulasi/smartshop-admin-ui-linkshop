import {Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HeatMapService} from '../heat-map.service';
import {Observable} from 'rxjs/Observable';
import {TimepickerConfig} from 'ngx-bootstrap';
import {HeatMapComponent} from '../component/heat-map.component';
import {DateTimeFormatter, LocalDate, LocalDateTime, LocalTime} from 'js-joda';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-heat-map-wrapper2',
  templateUrl: './heat-map-wrapper2.component.html',
  styleUrls: ['./heat-map-wrapper2.component.scss']
})
export class HeatMapWrapper2Component implements OnInit {

  companyList: any;
  shopList$: Observable<any>;

  showDate1 = false;
  showDate2 = false;
  startDate: Date = new Date();
  endDate: Date = new Date();
  startTime: Date = new Date();
  endTime: Date = new Date();

  org;
  shopId;

  @Output() onClose = new EventEmitter<any>();

  @ViewChild('appHeatMap') appHeatMap: HeatMapComponent;

  constructor(
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private heatMapService: HeatMapService) {}

  ngOnInit() {
    this.companyList = this.route.snapshot.data.companyList.content;
  }


  onCompanyChange(event) {
    this.shopList$ = this.heatMapService.getShopsByOrgCode(event);
  }

  onShopChange(event) {
    const resArr = event.split('-');
    this.shopId = resArr[0];
    this.org = resArr[1];
  }

  getFormatDate(date: any, time: any) {
    return LocalDateTime.of(
      Number(this.datePipe.transform(date, 'yyyy')),
      Number(this.datePipe.transform(date, 'MM')),
      Number(this.datePipe.transform(date, 'dd')),
      Number(this.datePipe.transform(time, 'HH')),
      Number(this.datePipe.transform(time, 'mm')));
  }

  showHeatMap() {
    if(this.shopId) {
      this.appHeatMap.reLoad(this.shopId, this.getFormatDate(this.startDate, this.startTime),
        this.getFormatDate(this.endDate, this.endTime));
    }
  }


  close(): void {
    this.onClose.emit(this);
  }

  slideChange(event) {

  }

}
