import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {CommonModule, DatePipe} from '@angular/common';
import {GuestRoutingModule} from './guest.routing';
import {PaginationModule, DatepickerModule, TimepickerModule, ModalModule, BsDatepickerModule} from 'ngx-bootstrap';

import {GuestInfoComponent} from './guestList/guestList.component';
import {AccessShopComponent} from './accessShopList/accessShopList.component';

import {HttpService} from '../app.service';
import {GuestService} from './guest.service';
import {Contant} from '../common/Contant';
import {ExcludeListComponent} from './excluedList/excludeList.component';
import {ShareModule} from '../shared/share.module';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import {ShareService} from '../shared/share.service';
import {OrgService} from '../organization/orgService';
import {AdminHttpClient} from '../admin.httpclient';
import { AccessLogFilterPipe } from './accessShopList/access-log-filter.pipe';
@NgModule({
  imports: [
    HttpModule,
    FormsModule,
    CommonModule,
    GuestRoutingModule,
    PaginationModule.forRoot(),
    DatepickerModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    ModalModule.forRoot(),
    ShareModule
  ],
  declarations: [
    GuestInfoComponent,
    AccessShopComponent,
    ExcludeListComponent,
    AccessLogFilterPipe
  ],
  providers: [
    HttpService,
    GuestService,
    DatePipe,
    Contant,
    ShareService,
    OrgService,
    AdminHttpClient,
  ]
})
export class GuestModule {
}
