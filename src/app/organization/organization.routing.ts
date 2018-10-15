import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {OrganizationListComponent} from './organizationList/organizationList.component';
import {ModifyShopComponent} from './organizationList/modifyShop/modifyShop.component';
import {ModifyOrganizationComponent} from './organizationList/modifyOrganization/modifyOrganization.component';
import {AddOrganizationComponent} from './organizationList/addOrganization/addOrganization.component';
import {AddShopComponent} from './organizationList/addShop/addShop.component';
import {CompanyListComponent} from './companyList/companyList.component';
import {AddCompanyListComponent} from './companyList/addCompanyList/addCompanyList.component';
import {ChannelComponent} from './channel/channel.component';
import {AddChannelComponent} from './channel/addChannel/addChannel.component';
import {AddChannelBrandComponent} from './channel/addChannelBrand/addChannelBrand.component';
import {OrgMapComponent} from "./orgMap.component";
import {UpdateChannelComponent} from "./channel/updateChannel/updateChannel.component";
import {ChannelLayoutComponent} from "./channel/channel.layout.component";
import {OrganizationLayoutComponent} from "./organizationList/organization.layout.component";
import {CompanyLayoutComponent} from "./companyList/company.layout.component";
import {NewMapComponent} from "./newMap.component";
import {OrganizationLevelComponent} from "./organizationLevel/organizationLevel.component";
import {AddOrganizationLevelComponent} from "./organizationLevel/addOrganizationLevel/addOrganizationLevel.component";
import {OrganizationLevelLayout} from "./organizationLevel/organizationLevel.layout";


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'organization'
    },
    children: [
      {
        path: 'map',
        component: OrgMapComponent,
      },
      {
        path: 'newmap',
        component: NewMapComponent,
      },
      {
        path: 'organizationInfo',
        component: OrganizationLayoutComponent,
        data: {
          title: 'organizationInfo'
        },
        children: [
          {
            path: '',
            component: OrganizationListComponent
          },
          {
            path: 'modifyOrganization',
            component: ModifyOrganizationComponent,
            data: {
              title: 'modifyOrganization'
            }
          },
          {
            path: 'addOrganization',
            component: AddOrganizationComponent,
            data: {
              title: 'addOrganization'
            }
          },
          {
            path: 'modifyShop',
            component: ModifyShopComponent,
            data: {
              title: 'modifyShop'
            }
          },
          {
            path: 'addShop',
            component: AddShopComponent,
            data: {
              title: 'addShop'
            }
          }
        ]
      },


      {
        path: 'companyList',
        component: CompanyLayoutComponent,
        data: {
          title: 'companyList'
        },
        children: [
          {
            path: '',
            component: CompanyListComponent,
          },
          {
            path: 'addCompanyList',
            component: AddCompanyListComponent,
          },
        ]
      },

      {
        path: 'channel',
        component: ChannelLayoutComponent,
        data: {
          title: 'channel'
        },
        children: [
          {
            path: '',
            component: ChannelComponent
          },
          {
            path: 'updateChannel/:id',
            component: UpdateChannelComponent,
          },
          {
            path: 'addChannel',
            component: AddChannelComponent,
          },
          {
            path: 'addChannelBrand',
            component: AddChannelBrandComponent,
          }
        ]
      },
      {
        path: 'level',
        component: OrganizationLevelLayout,
        data: {
          title: 'level'
        },
        children: [
          {
            path: '',
            component: OrganizationLevelComponent
          },
          {
            path: 'addLevel',
            component: AddOrganizationLevelComponent,
            data: {
              title: 'addLevel'
            }
          }
        ]
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationRoutingModule {
}
