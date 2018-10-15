import {Component, OnInit} from "@angular/core";
import {Router, ActivatedRoute} from '@angular/router';
import {OrgService} from "../../orgService";

@Component({
  templateUrl: './addOrganizationLevel.html'
})

export class AddOrganizationLevelComponent implements OnInit {
  sub: any;
  companyName: any;
  companyId: any;
  levelName: any;
  level: any;
  isShop: boolean = false;
  isWeather: boolean = false;
  flag: any;
  minLevel: any;
  maxLevel: any;
  isAdd: boolean = false;
  isOffice: any;
  levelId: any;
  levelList: any = [1, 2, 3, 4, 5];
  maxRange: any = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  minRange: any = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private orgService: OrgService) {
  }

  ngOnInit() {
    this.sub = this.route.queryParams.subscribe(params => {
      this.companyName = params['companyName'];
      this.companyId = params['companyId'];
      this.isAdd = params['isAdd'];
      this.levelId = params['levelId'];
      // console.log(this.levelId);
    })
    if (!this.isAdd) {
      this.getLevelInfo();
    }
  }

  getLevelInfo() {
    this.orgService.getLevelInfo(this.levelId).subscribe(data => {
      // console.log(JSON.stringify(data, null, 4));
      this.levelName = data.name;
      this.level = data.level;
      this.isShop = data.shop;
      this.minLevel = data.minZoom;
      this.maxLevel = data.maxZoom;
    })
  }

  onLevelChange(event) {
    this.level = event;
  }

  onShopChange(event) {
    this.isShop = event;
  }

  onWeatherChange(event) {
    this.isWeather = event;
  }

  onMaxLevelChange(event) {
    this.maxLevel = event;
  }

  onMinLevelChange(event) {
    this.minLevel = event;
  }

  onOfficeChange(event) {
    this.isOffice = event;
  }

  addLevel() {
    if (this.isAdd) {
      this.orgService.addLevel({
        name: this.levelName,
        companyId: this.companyId,
        level: this.level,
        shop: this.isShop,
        minZoom: this.minLevel,
        maxZoom: this.maxLevel,
        showWeather: this.isWeather,
        flag: this.isOffice
      }).subscribe(data => {
        console.log(JSON.stringify(data, null, 4))
        if (data) {
          this.router.navigate(['/organization/level'])
        }
      })
    } else {
      this.orgService.updateLevel(this.levelId, {
        name: this.levelName,
        companyId: this.companyId,
        level: this.level,
        shop: this.isShop,
        minZoom: this.minLevel,
        maxZoom: this.maxLevel,
        showWeather: this.isWeather,
        flag: this.isOffice
      }).subscribe(data => {
        // console.log('/////' + JSON.stringify(data, null, 4))
        if (data) {
          this.router.navigate(['/organization/level'])
        }
      })
    }
  }
}
