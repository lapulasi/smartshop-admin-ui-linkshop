import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {OrgService} from "../orgService";

@Component({
  templateUrl: './organizationLevel.html'
})

export class OrganizationLevelComponent implements OnInit {
  companyList: any;
  currentIndex: any;
  companyId: any;
  companyName: any;
  levelList: any;
  company: any = 1;

  constructor(private router: Router,
              private orgService: OrgService) {
  }

  ngOnInit() {
    /*if (window.sessionStorage) {
      this.currentIndex = sessionStorage.getItem('companyIndex') === null ? 0 : sessionStorage.getItem('companyIndex');
      this.company = this.currentIndex;
    } else {
      console.log('you brower no surport!')
    }
    const user = JSON.parse(localStorage.getItem('currentUser'));
    this.companyId = user.companyId;
    /!*this.companyId = this.companyList[this.currentIndex].id;
    this.companyName = this.companyList[this.currentIndex].name;*!/
    this.companyData();*/
  }

  /*companyData() {
    this.orgService.getCompanyList(this.companyId).subscribe(data => {
      // console.log('this.companyList ' + JSON.stringify(data, null, 4));
      this.companyList = data.content;
      // console.log('this.currentIndex==' + this.currentIndex)
      if (this.currentIndex !== ( null || '')) {
        this.companyId = this.companyList[this.currentIndex].id;
        this.companyName = this.companyList[this.currentIndex].name;
        this.getLevelList();
      }
    });
  }*/

  getCompanyInfo(event) {
    // console.log(event);
    const currentIndex = event.currentIndex;
    if (currentIndex === undefined) {
      return;
    } else {
      this.companyId = event.id;
      this.companyName = event.name;
      // console.log(this.companyName);
      this.getLevelList();
    }
  }

  /*onCompanyChange(event) {
    // console.log(event);
    if (event !== '') {
      this.currentIndex = event;
    }
    if (window.sessionStorage) {
      sessionStorage.setItem('companyIndex', this.currentIndex)
    } else {
      console.log('you brower no surport!')
    }
    this.companyId = this.companyList[this.currentIndex].id;
    this.companyName = this.companyList[this.currentIndex].name;
    this.getLevelList();
  }*/

  getLevelList() {
    this.orgService.getLevelList(this.companyId).subscribe(data => {
      // console.log(JSON.stringify(data, null, 4));
      this.levelList = data;
    })
  }

  addLevel() {
    this.router.navigate(['/organization/level/addLevel'], {
      queryParams: {
        'companyName': this.companyName,
        'companyId': this.companyId,
        'isAdd': true
      }
    });
  }

  editeLevel(levelId) {
    // console.log(levelId);
    this.router.navigate(['/organization/level/addLevel'], {
      queryParams: {
        'companyName': this.companyName,
        'companyId': this.companyId,
        'levelId': levelId
      }
    });
  }

  deleteLevel(levelId) {
    this.orgService.deleteLevel(levelId).subscribe(data => {
      // console.log(JSON.stringify(data, null, 4));
      if (data.content === 'SUCCESS') {
        this.getLevelList();
      }
    })
  }
}
