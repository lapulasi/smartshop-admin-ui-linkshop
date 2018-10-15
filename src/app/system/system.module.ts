import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {CommonModule, DatePipe} from '@angular/common';
import {PaginationModule, ModalModule, DatepickerModule, TimepickerModule} from 'ngx-bootstrap';
import {SystemRoutingModule} from './system.routing';
import {FileUploadModule} from 'ng2-file-upload';

import {BsDropdownModule} from 'ngx-bootstrap/dropdown';

import {HttpService} from '../app.service';
import {SystemService} from './system.service';
import {Contant} from '../common/Contant';

import {FaceContrastComponent} from './faceContrast/faceContrast.component';
import {AttrRecognitionComponent} from './attrRecognition/attrRecognition.component';
import { ImageUploadModule } from 'angular2-image-upload';
import {OrgService} from "../organization/orgService";
import {AdminHttpClient} from "../admin.httpclient";

@NgModule({
  imports: [
    HttpModule,
    FormsModule,
    CommonModule,
    PaginationModule.forRoot(),
    DatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    ModalModule.forRoot(),
    SystemRoutingModule,
    FileUploadModule,
    BsDropdownModule.forRoot(),
    ImageUploadModule.forRoot()
  ],
  declarations: [
    FaceContrastComponent,
    AttrRecognitionComponent
    /*DeviceVersionComponent,
    DeviceAddComponent,
    DeviceVersionAddComponent,
    DeviceUpdateComponent,*/
  ],
  providers: [
    HttpService,
    SystemService,
    Contant,
    DatePipe,
    OrgService,
    AdminHttpClient
  ]
})
export class SystemModule {
}
