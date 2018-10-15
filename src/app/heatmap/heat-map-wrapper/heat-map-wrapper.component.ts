import {Component, ComponentFactoryResolver, EventEmitter, Input, OnInit, Output, ViewChild, ViewContainerRef} from '@angular/core';
import {HeatMapComponent} from '../component/heat-map.component';
import {LocalDate, LocalTime} from 'js-joda';
import {DatePipe} from '@angular/common';
import {TimepickerConfig} from 'ngx-bootstrap';

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
  selector: 'app-heat-map-wrapper',
  templateUrl: './heat-map-wrapper.component.html',
  styleUrls: ['./heat-map-wrapper.component.scss'],
  providers : [{ provide: TimepickerConfig, useFactory: getTimepickerConfig }],
  entryComponents: [HeatMapComponent]
})
export class HeatMapWrapperComponent implements OnInit {

  @Input() org;

  @Input() shopId;

  @Input() shopName;

  @Output() onClose = new EventEmitter<any>();

  showDate1 = false;

  showDate2 = false;

  startDate: Date = new Date();
  endDate: Date = new Date();
  startTime: Date = new Date(new Date().getTime() - 3600000);
  endTime: Date = new Date();

  @ViewChild('dynamicHeatMapContainer', { read: ViewContainerRef }) dynamicHeatMapContainer: ViewContainerRef;


  constructor(private datePipe: DatePipe,
              private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {

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


  showHeatMap() {
    if (this.shopId) {
      // 动态加载热力图component
      this.dynamicHeatMapContainer.clear();
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(HeatMapComponent);
      const componentRef = this.dynamicHeatMapContainer.createComponent(componentFactory);
      (<HeatMapComponent> componentRef.instance).shopId = this.shopId;
      (<HeatMapComponent> componentRef.instance).beginDate = this.getFormatDate(this.startDate).toString();
      (<HeatMapComponent> componentRef.instance).endDate = this.getFormatDate(this.endDate).toString();
      (<HeatMapComponent> componentRef.instance).beginHour = this.getFormatTime(this.startTime).hour();
      (<HeatMapComponent> componentRef.instance).endHour = this.getFormatTime(this.endTime).hour();

    }
  }

  close(): void {
    this.onClose.emit({orgId:this.org,shopId:this.shopId});
  }
}
