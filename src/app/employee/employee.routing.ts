import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {EmployeeInfoComponent} from './employeeList/employeeList.component';
import {ClerkOnDutyComponent} from './clerkOnDuty/clerkOnDuty.component';
import {ManagerOnDutyComponent} from './managerOnDuty/managerOnDuty.component';
import {EnterEmployeeComponent} from './enterEmployee/enterEmployee.component';
import {ChooseOrganizationComponent} from './enterEmployee/chooseOrganization/chooseOrganization.component';
/*import { DeviceAddComponent } from './deviceAdd/deviceAdd.component';
import { DeviceVersionAddComponent} from './deviceVersionAdd/deviceVersionAdd.component';
import { DeviceUpdateComponent } from './deviceUpdate/deviceUpdate.component';*/
import {EmployeeResolve} from './employee.resolve';
import {CanActivateViaAuthGuard, CanActivateChildViaAuthGuard} from '../common/CanActivateViaAuthGuard';
import {OrgAuthorizationComponent} from "./orgAuthorization/orgAuthorization.component";


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'employee'
    },
    children: [
      {
        path: 'employeeInfo',
        component: EmployeeInfoComponent,
        data: {
          title: 'employeeInfo'
        }
      },
      {
        path: 'clerkOnDuty',
        component: ClerkOnDutyComponent,
        data: {
          title: 'clerkOnDuty'
        }
      },
      {
        path: 'ManagerOnDuty',
        component: ManagerOnDutyComponent,
        data: {
          title: 'ManagerOnDuty'
        }
      },
      {
        path: 'enterEmployee',
        component: EnterEmployeeComponent,
        data: {
          title: 'enterEmployee'
        }
      },
      {
        path: 'chooseOrganization',
        component: ChooseOrganizationComponent,
        data: {
          title: 'chooseOrganization'
        }
      },
      {
        path: 'orgAuthorization',
        component: OrgAuthorizationComponent,
        data: {
          title: 'orgAuthorization'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule {
}
