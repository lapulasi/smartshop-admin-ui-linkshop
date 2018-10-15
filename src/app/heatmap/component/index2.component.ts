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
import {HeatMapWrapper2Component} from '../heat-map-wrapper2/heat-map-wrapper2.component';


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
    <button (click)="addComponent()" class="btn btn-primary">添加</button>
      <div  style="overflow: scroll;white-space: nowrap;height: 800px">
        <ng-template #container>

        </ng-template>
      </div>



  `,
  providers : [{ provide: TimepickerConfig, useFactory: getTimepickerConfig }],
  entryComponents: [HeatMapWrapper2Component]
})

export class Index2Component implements OnInit {

  @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;

  components = [];


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


  addComponent() {
    // Create component dynamically inside the ng-template
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(HeatMapWrapper2Component);
    const component = this.container.createComponent(componentFactory);
    component.instance.onClose.subscribe((componentInstance: HeatMapWrapper2Component)=> {
      this.removeComponent(componentInstance);
    });
    this.components.push(component);
  }

  removeComponent(componentInstance) {
    const index = this.components.findIndex((component) => component.instance === componentInstance);
    if (index !== -1) {
      this.container.remove(index);
      this.components.splice(index, 1);
    }
  }
}

interface HeatMapParam {
  shopName:string;
  shopId:Number;
  orgId: Number;
}
