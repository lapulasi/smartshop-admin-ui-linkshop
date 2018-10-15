import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login.routing';

import {LoginComponent} from './login.component';

import { HttpService } from '../app.service';
import { LoginService } from './login.service';
import {OrgService} from "../organization/orgService";
import {AdminHttpClient} from "../admin.httpclient";


@NgModule({
  imports: [
    HttpModule,
    FormsModule,
    CommonModule,
    LoginRoutingModule
  ],
  declarations: [
    LoginComponent
  ],
  providers: [
    HttpService,
    LoginService,
    OrgService,
    AdminHttpClient
  ]
})
export class LoginModule { }
