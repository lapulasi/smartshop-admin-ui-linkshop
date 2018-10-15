import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {PassengerFlowComponent} from './passengerFlow/passengerFlow.component';
import {DataService} from './data.service';
import {ShareModule} from '../shared/share.module';
import {DataRoutingModule} from './data.routing';
import {AdminHttpClient} from '../admin.httpclient';
import {FormsModule} from '@angular/forms';
import {PaginationModule, DatepickerModule, TimepickerModule, ModalModule, BsDatepickerModule} from 'ngx-bootstrap';
import {ShareService} from '../shared/share.service';
import {HttpService} from '../app.service';
import {DwellTimeComponent} from './dwellTime/dwellTime.component';
import {SalesComponent} from './sales/sales.component';
import {CommonComponent} from './common/common.component';
import { OrgComponent } from './device/org/org.component';
import { ShopComponent } from './device/shop/shop.component';
import {DeviceComponent} from './device/device.component';

@NgModule({
  imports: [
    CommonModule,
    DataRoutingModule,
    ShareModule,
    FormsModule,
    PaginationModule.forRoot(),
    DatepickerModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    ModalModule.forRoot(),

  ],
  declarations: [
    PassengerFlowComponent,
    DwellTimeComponent,
    SalesComponent,
    CommonComponent,
    OrgComponent,
    ShopComponent,
    DeviceComponent
  ],
  providers: [
    DataService,
    AdminHttpClient,
    ShareService,
    HttpService,
    DatePipe
  ]
})

export class DataModule {
}
