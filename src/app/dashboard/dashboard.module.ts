import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import {PaginationModule, ModalModule} from 'ngx-bootstrap';

import { HttpService } from '../app.service';
import { DashboardService } from './dashboard.service';
import {AdminHttpClient} from "../admin.httpclient";
import {OrgService} from "../organization/orgService";
import {DatePipe} from '@angular/common';
import {CustomerComponent} from "../customer/customer.component";
import {FormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DashboardRoutingModule,
    ChartsModule,
    BsDropdownModule,
    PaginationModule.forRoot(),
    ModalModule.forRoot()
  ],
  declarations: [
    DashboardComponent,
    CustomerComponent
  ],
  providers: [
    HttpService,
    DashboardService,
    AdminHttpClient,
    OrgService,
    DatePipe
  ]
})
export class DashboardModule { }
