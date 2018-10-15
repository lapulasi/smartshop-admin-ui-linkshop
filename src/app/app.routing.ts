import {ShopComponent} from './shop/shop.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Layouts
import { FullLayoutComponent } from './layouts/full-layout.component';
// import {TestComponent} from './test/test.component';
import { CanActivateViaAuthGuard, CanActivateChildViaAuthGuard } from './common/CanActivateViaAuthGuard';


export const routes: Routes = [

  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path : 'login',
    loadChildren: './login/login.module#LoginModule'
  },
 /* {
    path : '**',
    component: DashboardComponent
  },*/
  {
    path: '',
    component: FullLayoutComponent,
    canActivateChild: [CanActivateChildViaAuthGuard],
    children: [
      {
        path: '',
        loadChildren: './dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'guest',
        loadChildren: './guest/guest.module#GuestModule'
      },
      {
        path: 'device',
        loadChildren: './device/device.module#DeviceModule'
      },
      {
        path: 'employee',
        loadChildren: './employee/employee.module#EmployeeModule'
      },
      {
        path: 'system',
        loadChildren: './system/system.module#SystemModule'
      },
      {
        path: 'organization',
        loadChildren: './organization/organization.module#OrganizationModule'
      },
      {
        path: 'shop',
        component : ShopComponent
      },
      {
        path: 'user',
        loadChildren : './user/user.module#UserModule'
      },
      {
        path: 'inventory',
        loadChildren : './inventory/inventory.module#InventoryModule'
      },
      {
        path: 'heatmap',
        loadChildren : './heatmap/heat-map.module#HeatMapModule'
      },
      {
        path: 'data',
        loadChildren: './data/data.module#DataModule'
      },
      {
        path: 'userLogs',
        loadChildren: './userLogs/userLogs.module#UserLogsModule'
      },
      {
        path: 'article',
        loadChildren: './article/article.module#ArticleModule'
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { useHash: true}) ], // enableTracing: true
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
