import {Component, OnInit} from '@angular/core';
import {EmployeeService} from '../employee.service';
import {Router, ActivatedRoute} from '@angular/router';
import {OrgService} from "../../organization/orgService";

declare var $: any;

@Component({
  templateUrl: './enterEmployee.html',
  styles: []
})

export class EnterEmployeeComponent implements OnInit {
  organizationName;
  organizationId;
  name;
  phone;
  company: any;
  companyList: any;
  companyId: any;
  companyName: any;
  treeData: any;
  token: any;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private service: EmployeeService,
              private orgService: OrgService) {
  }

  ngOnInit() {
    const token = JSON.parse(localStorage.getItem('token'));
    this.token = token;

    this.route.queryParams.subscribe(params => {
      this.organizationName = params['name'];
      this.organizationId = params['parentOrgId'];
      // console.log('this.name==' + this.organizationName + ';;this.id==' + this.organizationId);
    })
  }

  getCompanyInfo(event, staticModal) {
    /*console.log(event)*/
    const currentIndex = event.currentIndex;
    if (currentIndex === undefined) {
      return;
    }else {
      staticModal.show();
      this.companyId = event.id;
      this.companyName = event.name;
    }
    /*console.log(this.companyId)
    console.log(this.companyName)*/

  }

  getOrgInfo(event) {
    // console.log(event);
    this.organizationName = event.name;
    this.organizationId = event._id;
  }

  query() {
    /*console.log(this.name)
    console.log(this.phone)*/
    if (this.name !== undefined && this.name !== null && this.phone !== undefined && this.phone !== null) {
      this.orgService.addEmployee(this.token, this.companyId, this.organizationId, this.name, this.phone).subscribe(data => {
        // console.log(JSON.stringify(data, null, 4))
        if (data) {
          alert('员工录入成功！');
        } else {
          alert(data['errorMsg'])
        }
        this.companyId = '';
        this.companyName = '';
        this.name = '';
        this.phone = '';
      })
    } else {
      alert('姓名和电话不能为空！')
    }

  }
}
