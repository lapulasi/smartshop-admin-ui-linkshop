import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GuestInfoComponent } from './guestList/guestList.component';
import { AccessShopComponent } from './accessShopList/accessShopList.component';
import { ExcludeListComponent } from './excluedList/excludeList.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'guest'
    },
    children: [
      {
        path: 'guestInfo',
        component: GuestInfoComponent,
        data: {
          title: 'guestInfo'
        }
      },
      {
        path: 'accessShop',
        component: AccessShopComponent,
        data: {
          title: 'accessShop'
        }
      },
      {
        path: 'excludeList',
        component: ExcludeListComponent,
        data: {
          title: 'excludeList'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuestRoutingModule {}
