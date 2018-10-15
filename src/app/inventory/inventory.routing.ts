import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {OverViewComponent} from './overview/overView.component';
import {DeviceDetailComponent} from './deviceDetail/deviceDetail.component';
import {OutboundRecordsComponent} from './outboundRecords/outboundRecords.component';
const routes: Routes = [
  {
    path: '',
    data: {
      title: 'inventory'
    },
    children: [
      {
        path: 'overview',
        component: OverViewComponent,
      },
      {
        path: 'deviceDetail',
        component: DeviceDetailComponent,
      },
      {
        path: 'outboundRecords',
        component: OutboundRecordsComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule {}
