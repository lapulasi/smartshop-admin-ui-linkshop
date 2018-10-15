import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {CommonModule, DatePipe} from '@angular/common';
import {PaginationModule, ModalModule, DatepickerModule, TimepickerModule, BsDatepickerModule} from 'ngx-bootstrap';
import {EmployeeRoutingModule} from './employee.routing';
import {FileUploadModule} from 'ng2-file-upload';
import {ShareModule} from "../shared/share.module";

import {EmployeeInfoComponent} from './employeeList/employeeList.component';
import {ClerkOnDutyComponent} from './clerkOnDuty/clerkOnDuty.component';
import {ManagerOnDutyComponent} from './managerOnDuty/managerOnDuty.component';
import {EnterEmployeeComponent} from './enterEmployee/enterEmployee.component';
import {ChooseOrganizationComponent} from './enterEmployee/chooseOrganization/chooseOrganization.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
// import {CompanyTreeComponent} from "../shared/companyTree/companyTree.component";

import {HttpService} from '../app.service';
import {EmployeeService} from './employee.service';
import {Contant} from '../common/Contant';
import {EmployeeResolve} from './employee.resolve';
import {ShareService} from "../shared/share.service";
import {OrgService} from "../organization/orgService";
import {OrgAuthorizationComponent} from "./orgAuthorization/orgAuthorization.component";
import {AdminHttpClient} from "../admin.httpclient";

@NgModule({
  imports: [
    HttpModule,
    FormsModule,
    CommonModule,
    PaginationModule.forRoot(),
    DatepickerModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    ModalModule.forRoot(),
    EmployeeRoutingModule,
    FileUploadModule,
    BsDropdownModule.forRoot(),
    ShareModule
  ],
  declarations: [
    EmployeeInfoComponent,
    ClerkOnDutyComponent,
    ManagerOnDutyComponent,
    EnterEmployeeComponent,
    ChooseOrganizationComponent,
    OrgAuthorizationComponent
    /*DeviceVersionComponent,
    DeviceAddComponent,
    DeviceVersionAddComponent,
    DeviceUpdateComponent,*/
  ],
  providers: [
    HttpService,
    EmployeeService,
    Contant,
    DatePipe,
    EmployeeResolve,
    ShareService,
    OrgService,
    AdminHttpClient
  ],
  schemas: [
    // CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class EmployeeModule {
}
