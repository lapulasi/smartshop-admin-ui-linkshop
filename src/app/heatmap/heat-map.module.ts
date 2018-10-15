import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {HeatMapRoutingModule} from './heat-map.routing';
import {HeatMapComponent} from './component/heat-map.component';
import {IndexComponent} from './component/index.component';
import {CompanyResolve} from './company.resolve';
import {FormsModule} from '@angular/forms';
import {OrgService} from '../organization/orgService';
import {AdminHttpClient} from '../admin.httpclient';
import {HttpClientModule} from '@angular/common/http';
import {HeatMapService} from './heat-map.service';
import {CarouselModule, DatepickerModule, TimepickerModule, BsDatepickerModule} from 'ngx-bootstrap';
import { HeatMapWrapperComponent } from './heat-map-wrapper/heat-map-wrapper.component';
import { HeatMapWrapper2Component } from './heat-map-wrapper2/heat-map-wrapper2.component';
import {Index2Component} from './component/index2.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HeatMapRoutingModule,
    DatepickerModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    CarouselModule.forRoot()
  ],
  declarations: [
    HeatMapComponent,
    IndexComponent,
    Index2Component,
    HeatMapWrapperComponent,
    HeatMapWrapper2Component,
  ],
  providers: [
    DatePipe,
    AdminHttpClient,
    HeatMapService,
    OrgService,
    CompanyResolve
  ]
})

export class HeatMapModule {}
