import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UpdatePasswdComponent} from "./update-passwd.component";

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'user'
    },
    children: [
      {
        path: 'updatePasswd',
        component: UpdatePasswdComponent,
        data: {
          title: 'updatePasswd'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
