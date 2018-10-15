import {Component, OnInit} from '@angular/core';
import {OrganizationService} from '../../organization.service';
import {OrgService} from "../../orgService";
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  templateUrl: './addCompanyList.html'
})
export class AddCompanyListComponent implements OnInit {

  companyName;
  level;

  constructor(private service: OrganizationService,
              private router: Router,
              private orgService: OrgService) {
  }

  ngOnInit() {

  }

  query() {
    this.orgService.addCompanyList({
      name: this.companyName,
      // level: this.level
    }).subscribe(data => {
      console.log(JSON.stringify(data, null, 4));
      if (data) {
        this.router.navigate(['/organization/companyList']);
      }
    })
  }
}
