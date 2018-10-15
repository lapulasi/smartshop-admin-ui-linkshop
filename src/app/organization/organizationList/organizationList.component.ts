import {Component, OnInit} from '@angular/core';
import {OrganizationService} from '../organization.service';
import {OrgService} from "../orgService";
import {Router} from '@angular/router';

declare var $: any;

@Component({
  templateUrl: './organizationList.html',
  styles: ['span >a:nth-child(2){margin-right: 3px; margin-left: 10px} span >a:nth-child(3){margin-right: 3px}']
})

export class OrganizationListComponent implements OnInit {
  treeData: any;
  company: number = 1;
  companyList: any;
  companyId: any;
  companyName: any;
  currentIndex: any; // 当前所选公司的索引

  addOrgUrl = '/organization/organizationInfo/addOrganization';
  modifyOrgUrl = '/organization/organizationInfo/modifyOrganization';
  addShopUrl = '/organization/organizationInfo/addShop';
  modifyShopUrl = '/organization/organizationInfo/modifyShop';

  orgRoot: boolean = false;

  constructor(private service: OrganizationService,
              private orgService: OrgService) {
  }

  ngOnInit() {
    if (window.sessionStorage) {
      this.currentIndex = sessionStorage.getItem('companyIndex') === null ? 0 : sessionStorage.getItem('companyIndex');
      this.company = this.currentIndex;
      // console.log(this.currentIndex)
    } else {
      // console.log('no surport!')
    }
    const user = JSON.parse(localStorage.getItem('currentUser'));
    this.companyId = user.companyId;
    // console.log(this.companyId);
    // if (this.companyId !== null && this.companyId !== undefined) {
      this.getOrgTree();
    // }
    // this.companyData();

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
  }

  getOrgTree() {
    this.orgService.getOrgTree_({companyId: this.companyId}).subscribe(data => {
      // console.log('getOrgTree==' + JSON.stringify(data, null, 4));
      if (data.length !== 0) {
        this.orgRoot = false;
        this.treeData = data[0];
        // console.log(JSON.stringify(this.treeData, null, 4))
        // this.companyName = this.companyList[this.currentIndex].name;
      } else {
        this.orgRoot = true;
        this.treeData = null;
      }
    })
  }

  getCompanyInfo(event) {
    // console.log(JSON.stringify(event, null,4));
    const currentIndex = event.currentIndex;
    if (currentIndex === undefined) {
      return;
    } else {
      this.companyId = event.id;
      this.companyName = event.name;
      // console.log(this.companyName);
      this.getOrgTree();
    }
  }

  deleteOrg($event: Event, id) {
    $event.stopPropagation();
    /* if (children.length > 0) {
       alert('很抱歉！该组织下面有子组织，您不能删除！');
     } else {*/
    const name = prompt('请输入您要删除的组织代码，删除不可恢复，请慎重操作！');
    if (name != null && name !== '') {
      if (parseInt(name) === id) {
        this.orgService.deleteOrg(id).subscribe(data => {
          // console.log(data);
          if (data.content === 'SUCCESS') {
            this.getOrgTree();
          }
        })
      } else {
        alert('组织代码不正确！');
      }
    }
  }

  // }
}
