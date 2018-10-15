import {Component, Input, Output, EventEmitter, OnInit, OnChanges} from '@angular/core';
import {OrgService} from "../../organization/orgService";

@Component({
  selector: 'app-company-list',
  templateUrl: './companyList.html'
})
export class CompanyListComponent implements OnInit {
  company: any;
  companyId: any;
  companyList: any;
  currentIndex: any; // 当前所选公司的索引
  companyName: any;
  @Input() organizationName: any;
  @Input() orgShow: any;
  @Input() organization: any;
  @Output() change = new EventEmitter();

  constructor(private orgService: OrgService) {
  }

  ngOnInit() {
    if (window.sessionStorage) {
      this.currentIndex = sessionStorage.getItem('companyIndex') === null ? 0 : sessionStorage.getItem('companyIndex');
      this.company = this.currentIndex;
      // console.log(this.currentIndex);
    } else {
      // console.log('no surport!')
    }

    const user = JSON.parse(localStorage.getItem('currentUser'));
    this.companyId = user.companyId;
    // console.log(this.companyId);
    this.getCompanyList();
  }

  getCompanyList() {
    this.orgService.getCompanyList(this.companyId).subscribe(data => {
      // console.log('this.companyList ' + JSON.stringify(data, null, 4));
      this.companyList = data.content;
      for (let i = 0, len = this.companyList.length; i < len; i++) {
        this.companyList[i].selected = false;
      }
      // console.log('this.companyList ' + JSON.stringify(data, null, 4));
      if (this.currentIndex !== ( null || '')) {
        this.companyId = this.companyList[this.currentIndex].id;
        this.companyName = this.companyList[this.currentIndex].name;
        if (this.organization) {
          this.getTreeList();
        }
      }
    });
  }

  showTreeList() {
    this.getTreeList();
  }

  onCompanyChange(event) {
    // console.log(event);
    if (event) {
      this.currentIndex = event;
      if (window.sessionStorage) {
        sessionStorage.setItem('companyIndex', this.currentIndex)
      } else {
        console.log('you brower no surport!')
      }
      this.companyId = this.companyList[event].id;
      this.companyName = this.companyList[event].name;
      this.getTreeList();
    } else {
      return;
    }
  }

  getTreeList() {
    // console.log(this.companyId);
    const companyInfo = {
      'id': this.companyId,
      'name': this.companyName,
      'companyModel': this.company,
      'currentIndex': this.currentIndex
    };
    this.change.emit(companyInfo);
  }
}
