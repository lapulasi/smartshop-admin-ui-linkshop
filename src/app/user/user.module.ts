import {NgModule} from "@angular/core";
import {UpdatePasswdComponent} from "./update-passwd.component";
import {UserRoutingModule} from "./user.routing";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {ModalModule} from "ngx-bootstrap";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ModalModule.forRoot(),
    UserRoutingModule
  ],
  declarations: [
    UpdatePasswdComponent
  ]
})
export class UserModule {

}
