import {Component, OnInit} from '@angular/core';
import {EmployeeService} from '../../employee.service';
import {Router,ActivatedRoute} from '@angular/router';

declare var $: any;

/*定义$*/

@Component({
  templateUrl: './chooseOrganization.html'
})

export class ChooseOrganizationComponent implements OnInit {
  companyList: any;
  companyName;
  companyId;
  treeData;
  path;
  sub;

  constructor(private service: EmployeeService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.sub = this.route.queryParams.subscribe(params => {
      this.path = parseInt(params['urlPath']);
      // // console.log('this.path==' + this.path);
    })
    this.companyData();
    $('.tree').on('click', 'li.parent_li > span', function (e) {

      var children = $(this).parent('li.parent_li').find(' > ul > li');

      if (children.is(':visible')) {

        children.hide('fast');

        $(this).attr('title', 'Expand this branch').find(' > i').addClass('icon-plus-sign').removeClass('icon-minus-sign');

      } else {

        children.show('fast');

        $(this).attr('title', 'Collapse this branch').find(' > i').addClass('icon-minus-sign').removeClass('icon-plus-sign');

      }

      e.stopPropagation();

    });
  }

  select() {
    if (this.companyId == null) {
      alert('请选择公司！');
    }
  }

  choose(item) {
    // // console.log('i==' + item.name)
    if (this.path === 1) {
      this.router.navigate(['/employee/enterEmployee'], {queryParams:  {'name': item.name, 'parentOrgId': item.id}});
    }else {
      this.router.navigate(['/employee/ManagerOnDuty'], {queryParams:  {'name': item.name, 'parentOrgId': item.id}});
    }
  }

  companyData() {
    this.service.listCompany().then(data => {
      // // console.log('this.companyList ' + JSON.stringify(data, null, 4));
      this.companyList = data;
    });
  }

  onCompanyChange(event) {
    // // console.log(event);
    this.companyId = this.companyList[event].id;
    this.companyName = this.companyList[event].name;
    this.getOrgTree();
  }

  getOrgTree() {
    this.service.getOrgTree({companyId: this.companyId}).then(data => {
      // // console.log('getOrgTree==' + JSON.stringify(data, null, 4));
      if (data.resultCode === 'SUCCESS') {
        this.treeData = data.resultData;
      }
    })
  }
}

