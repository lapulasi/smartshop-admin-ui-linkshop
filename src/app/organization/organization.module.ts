import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {PaginationModule, ModalModule} from 'ngx-bootstrap';
import {OrganizationRoutingModule} from './organization.routing';
import {FileUploadModule} from 'ng2-file-upload';

import {OrganizationListComponent} from './organizationList/organizationList.component';
import {ModifyShopComponent} from './organizationList/modifyShop/modifyShop.component';
import {ModifyOrganizationComponent} from './organizationList/modifyOrganization/modifyOrganization.component';
import {AddOrganizationComponent} from './organizationList/addOrganization/addOrganization.component';
import {AddShopComponent} from './organizationList/addShop/addShop.component';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {CompanyListComponent} from './companyList/companyList.component';
import {AddCompanyListComponent} from './companyList/addCompanyList/addCompanyList.component';
import {ChannelComponent} from './channel/channel.component';
import {AddChannelComponent} from './channel/addChannel/addChannel.component';
import {AddChannelBrandComponent} from './channel/addChannelBrand/addChannelBrand.component';

import {HttpService} from '../app.service';
import {OrganizationService} from './organization.service';
import {Contant} from '../common/Contant';
import {EmployeeResolve} from './organization.resolve';
import {ThreeLink} from '../common/ThreeLink';
import {OrgMapComponent} from "./orgMap.component";
import {ChannelMapComponent} from "./channelMap.component";
import {UpdateChannelComponent} from "./channel/updateChannel/updateChannel.component";
import {ChannelLayoutComponent} from "./channel/channel.layout.component";
import {OrganizationLayoutComponent} from "./organizationList/organization.layout.component";
import {CompanyLayoutComponent} from "./companyList/company.layout.component";
import {NewMapComponent} from "./newMap.component";
import {OrganizationLevelComponent} from "./organizationLevel/organizationLevel.component";
import {AddOrganizationLevelComponent} from "./organizationLevel/addOrganizationLevel/addOrganizationLevel.component";
import {OrganizationLevelLayout} from "./organizationLevel/organizationLevel.layout";
import {OrgService} from "./orgService";
import {ShareModule} from "../shared/share.module";
import {AdminHttpClient} from "../admin.httpclient";

@NgModule({
  imports: [
    HttpModule,
    FormsModule,
    CommonModule,
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    OrganizationRoutingModule,
    FileUploadModule,
    BsDropdownModule.forRoot(),
    ShareModule
  ],
  declarations: [
    OrganizationListComponent,
    ModifyShopComponent,
    ModifyOrganizationComponent,
    AddOrganizationComponent,
    AddShopComponent,
    CompanyListComponent,
    AddCompanyListComponent,
    ChannelComponent,
    AddChannelComponent,
    AddChannelBrandComponent,
    OrgMapComponent,
    ChannelMapComponent,
    UpdateChannelComponent,
    ChannelLayoutComponent,
    OrganizationLayoutComponent,
    CompanyLayoutComponent,
    NewMapComponent,
    OrganizationLevelComponent,
    AddOrganizationLevelComponent,
    OrganizationLevelLayout
  ],
  providers: [
    HttpService,
    OrganizationService,
    OrgService,
    Contant,
    EmployeeResolve,
    ThreeLink,
    AdminHttpClient
  ],
  schemas: [
    // CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class OrganizationModule {
}
