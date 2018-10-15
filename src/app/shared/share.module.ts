import {CompanyTreeComponent} from "./companyTree/companyTree.component";
import {CompanyListComponent} from "./companyList/companyList.component";
import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {OrgService} from "../organization/orgService";
import {FormsModule} from "@angular/forms";


@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    CompanyTreeComponent,
    CompanyListComponent
  ],
  exports: [
    CompanyTreeComponent,
    CompanyListComponent
  ],
  providers: [
    OrgService
  ]
})
export class ShareModule {
}
