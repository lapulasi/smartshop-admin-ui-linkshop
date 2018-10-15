import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PaginationModule, ModalModule  } from 'ngx-bootstrap';
import { DeviceRoutingModule } from './device.routing';
import { FileUploadModule  } from 'ng2-file-upload';
import {ShareModule} from "../shared/share.module";

import { DeviceInfoComponent } from './deviceList/deviceList.component';
import { DeviceDetailComponent } from './deviceDetail/deviceDetail.component';
import { DeviceMsgComponent } from './deviceMsg/deviceMsg.component';
import { DeviceAddComponent } from './deviceAdd/deviceAdd.component';
import { DeviceVersionAddComponent } from './deviceVersionAdd/deviceVersionAdd.component';
import { DeviceUpdateComponent } from './deviceUpdate/deviceUpdate.component';
import {CompanyTreeComponent} from "../shared/companyTree/companyTree.component";

import { HttpService } from '../app.service';
import { DeviceService } from './device.service';
import { Contant } from '../common/Contant';
import { DeviceResolve } from './device.resolve';
import {HeatMapComponent} from './heat-map/heat-map.component';
import {ShareService} from "../shared/share.service";
import {OrgService} from "../organization/orgService";
import {AdminHttpClient} from "../admin.httpclient";
import {AddDeviceComponent} from "./addDevice/addDevice.component";

@NgModule({
  imports: [
    HttpModule,
    FormsModule,
    CommonModule,
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    DeviceRoutingModule,
    FileUploadModule,
    ShareModule
  ],
  declarations: [
    DeviceInfoComponent,
    DeviceDetailComponent,
    DeviceMsgComponent,
    DeviceAddComponent,
    AddDeviceComponent,
    DeviceVersionAddComponent,
    DeviceUpdateComponent,
    HeatMapComponent,
    // CompanyTreeComponent
  ],
  providers: [
    HttpService,
    DeviceService,
    Contant,
    DeviceResolve,
    ShareService,
    OrgService,
    AdminHttpClient
  ]
})
export class DeviceModule { }
