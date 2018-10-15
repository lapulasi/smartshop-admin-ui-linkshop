import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PassengerFlowComponent} from "./passengerFlow/passengerFlow.component";
import {DwellTimeComponent} from "./dwellTime/dwellTime.component";
import {SalesComponent} from "./sales/sales.component";
import { OrgComponent } from './device/org/org.component';
import { ShopComponent } from './device/shop/shop.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'data'
    },
    children: [
      {
        path: 'flowData',
        component: PassengerFlowComponent,
        data: {
          title: 'flowData'
        }
      },
      {
        path: 'dwellTime',
        component: DwellTimeComponent,
        data: {
          title: 'dwellTime'
        }
      },
      {
        path: 'sales',
        component: SalesComponent,
        data: {
          title: 'sales'
        }
      },
      {
        path: 'org',
        component: OrgComponent,
        data: {
          title: 'org'
        }
      },
      {
        path: 'shop',
        component: ShopComponent,
        data: {
          title: 'shop'
        }
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class DataRoutingModule {
}
