import {Component, OnInit} from '@angular/core';
import {OrganizationService} from '../../organization.service';
import {OrgService} from "../../orgService";
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  templateUrl: './modifyOrganization.html',
  styles: ['.marginTop{margin-top:100px}']
})
export class ModifyOrganizationComponent implements OnInit {
  sub: any;
  level: any;
  orgId: any;
  orgName: any;
  companyId: any;
  geoCoord: any;
  boundry: any;
  zoom: any;
  districtName: any;

  constructor(private route: ActivatedRoute,
              private service: OrganizationService,
              private orgService: OrgService,
              private router: Router) {
  }

  ngOnInit() {
    this.sub = this.route.queryParams.subscribe(params => {
      this.orgName = params['name'];
      this.orgId = params['parentOrgId'];
      this.companyId = params['companyId'];

      this.orgService.getOrgInfo(this.orgId).subscribe(data => {
        // console.log(JSON.stringify(data, null, 4));
        this.geoCoord = data.geo;
      });

    })
  }

  changeOrgan() {
    this.orgService.updateOrganization(this.orgId, {
      name: this.orgName,
      lng: this.geoCoord[0],
      lat: this.geoCoord[1]
    }).subscribe(data => {
      // console.log(data);
      if (data.content === 'SUCCESS') {
        this.router.navigate(['/organization/organizationInfo'])
      }
    })
  }
}
