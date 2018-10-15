import {Component, OnInit} from "@angular/core";
import {OrgService} from "../../organization/orgService";
import {ActivatedRoute, Router} from "@angular/router";

declare var $: any;

@Component({
  selector: 'app-org-authorization',
  templateUrl: './orgAuthorization.html',
  styles: ['.checkbox{display: inline-block; margin-top: 5px; margin-bottom: 0}']
})
export class OrgAuthorizationComponent implements OnInit {
  companyName: any;
  treeData: any;
  company: any;
  orgIds: any = [];
  sub: any;
  userId: any;
  token: any;

  constructor(private orgService: OrgService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.token = JSON.parse(localStorage.getItem('token'));
    this.sub = this.route.queryParams.subscribe(params => {
      this.userId = params['userId'];
    })

    this.getUserInfo();
    // console.log(this.userId);
    $('.tree').on('click', 'li.parent_li > span', function (e) {

      var children = $(this).parent('li.parent_li').find(' > ul > li');

      if (children.is(':visible')) {

        children.hide('fast');

        $(this).attr('title', 'Expand this branch').find(' > i').addClass('fa-folder-o').removeClass('fa-folder-open-o');

      } else {

        children.show('fast');

        $(this).attr('title', 'Collapse this branch').find(' > i').addClass('fa-folder-open-o').removeClass('fa-folder-o');

      }

      e.stopPropagation();

    });
    // console.log(this.company);

  }

  getUserInfo() {
    this.orgService.userInfo(this.userId).subscribe(data => {
      // console.log(JSON.stringify(data, null, 4));
      this.orgIds = data.orgIds;
      this.company = data.companyId;
      if (this.company !== undefined && this.company !== '') {
        this.getOrgTree();
      }
    })
  }

  getOrgTree() {
    this.orgService.getOrgTree_({companyId: this.company}).subscribe(data => {
      // console.log('getOrgTree==' + JSON.stringify(data, null, 4));
      if (data.length !== 0) {
        this.treeData = data[0];
      }
    })
  }

  selectOrg(orgId) {
    if (this.orgIds.includes(orgId)) {
      const index = this.orgIds.indexOf(orgId);
      // console.log(index);
      this.orgIds.splice(index, 1)
    } else {
      this.orgIds.push(Number(orgId));
    }
    // console.log(this.orgIds);
  }

  orgAuthorzation() {
    this.orgService.orgAuthorization(this.userId, this.token, this.orgIds).subscribe(data => {
      // console.log(JSON.stringify(data, null, 4))
      if (data.resultCode === 'SUCCESS') {
        this.router.navigate(['/employee/employeeInfo'])
      }
    })
  }
}
