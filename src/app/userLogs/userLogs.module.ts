import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {UserLogsService} from './userLogs.service';
import {UserLogsRouting} from './userLogs.routing';
import {AdminHttpClient} from '../admin.httpclient';
import {FormsModule} from '@angular/forms';
import {CommonComponent} from './common/common.component';
import {PageViewsComponent} from './pageViews/pageViews.component';
import {EventViewsComponent} from './eventViews/eventViews.component';
import {PaginationModule, DatepickerModule, TimepickerModule, ModalModule, BsDatepickerModule} from 'ngx-bootstrap';
import {OrgService} from "../organization/orgService";
import {Contant} from "../common/Contant";

@NgModule({
  imports: [
    CommonModule,
    UserLogsRouting,
    FormsModule,
    PaginationModule.forRoot(),
    DatepickerModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    ModalModule.forRoot(),
  ],
  declarations: [
    CommonComponent,
    PageViewsComponent,
    EventViewsComponent
  ],
  providers: [
    UserLogsService,
    AdminHttpClient,
    DatePipe,
    OrgService,
    Contant
  ]
})

export class UserLogsModule {
}
