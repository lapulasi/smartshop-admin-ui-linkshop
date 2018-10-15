import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { InventoryRoutingModule } from './inventory.routing';
import { PaginationModule, DatepickerModule, TimepickerModule, ModalModule, BsDatepickerModule } from 'ngx-bootstrap';


import { HttpService } from '../app.service';
import { InventoryService } from './inventory.service';
import { Contant } from '../common/Contant';
import {OverViewComponent} from './overview/overView.component';
import {DeviceDetailComponent} from './deviceDetail/deviceDetail.component';
import {OutboundRecordsComponent} from './outboundRecords/outboundRecords.component';

@NgModule({
  imports: [
    HttpModule,
    FormsModule,
    CommonModule,
    ModalModule,
    InventoryRoutingModule,
    PaginationModule.forRoot(),
    DatepickerModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot()
  ],
  declarations: [
    OverViewComponent,
    DeviceDetailComponent,
    OutboundRecordsComponent
  ],
  providers: [
    HttpService,
    InventoryService,
    DatePipe,
    Contant
  ]
})
export class InventoryModule { }
