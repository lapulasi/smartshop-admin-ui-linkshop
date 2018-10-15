import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeviceInfoComponent } from './deviceList/deviceList.component';
import { DeviceDetailComponent } from './deviceDetail/deviceDetail.component';
import { DeviceMsgComponent } from './deviceMsg/deviceMsg.component';
import { DeviceAddComponent } from './deviceAdd/deviceAdd.component';
import { DeviceVersionAddComponent} from './deviceVersionAdd/deviceVersionAdd.component';
import { DeviceUpdateComponent } from './deviceUpdate/deviceUpdate.component';
import { DeviceResolve } from './device.resolve';
import { CanActivateViaAuthGuard, CanActivateChildViaAuthGuard } from '../common/CanActivateViaAuthGuard';
import {HeatMapComponent} from './heat-map/heat-map.component';
import {AddDeviceComponent} from "./addDevice/addDevice.component";


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'device'
    },
    children: [
      {
        path: 'deviceInfo',
        component: DeviceInfoComponent,
        data: {
          title: 'deviceInfo'
        }
      },
      {
        path: 'deviceDetail',
        component: DeviceDetailComponent,
        data: {
          title: 'deviceDetail'
        }
      },
      {
        path: 'deviceMsg',
        component: DeviceMsgComponent,
        data: {
          title: 'deviceMsg'
        }
      },
      {
        path: 'deviceAdd',
        component: DeviceAddComponent,
        data: {
          title: 'deviceAdd'
        }
      },
      {
        path: 'addDevice',
        component: AddDeviceComponent,
        data: {
          title: 'addDevice'
        }
      },
      {
        path: 'deviceUpdate/:id',
        component: DeviceUpdateComponent,
        resolve: {deviceDetail: DeviceResolve}
      },
      {
        path: 'versionAdd',
        component: DeviceVersionAddComponent,
        data: {
          title: 'deviceVersionAdd'
        }
      },
      {
        path: 'heatMapBg/:deviceUID',
        component: HeatMapComponent
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeviceRoutingModule {}
