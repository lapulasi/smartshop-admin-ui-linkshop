import {Component, OnInit} from '@angular/core';
import {OrganizationService} from '../organization.service';
import {OrgService} from "../orgService";
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  templateUrl: './companyList.html'
})
export class CompanyListComponent implements OnInit {

  companyData;
  currPage: any = 0;
  pageSize = 15;
  companyId: any;

  constructor(private service: OrganizationService,
              private router: Router,
              private orgService: OrgService) {
  }

  pageChanged(event) {
    this.currPage = event.page;
    console.log(this.currPage)
  }

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    this.companyId = user.companyId;
    this.getCompanyList();
    // console.log(this.companyId)
  }

  getCompanyList() {
    this.orgService.getCompanyList(this.companyId).subscribe(data => {
      // console.log(JSON.stringify(data, null, 4));
      if (data) {
        this.companyData = data.content;
      }
    })
  }

  addCompany() {
    this.router.navigate(['/organization/companyList/addCompanyList']);
  }
}
