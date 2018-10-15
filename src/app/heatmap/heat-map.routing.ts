import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {IndexComponent} from './component/index.component';
import {CompanyResolve} from './company.resolve';
import {Index2Component} from './component/index2.component';

const routes: Routes = [
  {
    path: 'index',
    component: Index2Component,
    resolve: {
      companyList: CompanyResolve
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class HeatMapRoutingModule {}
