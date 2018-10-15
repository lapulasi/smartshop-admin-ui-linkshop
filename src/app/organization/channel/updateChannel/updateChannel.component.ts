import {Component, OnInit} from "@angular/core";
import {OrganizationService} from "../../organization.service";
import {ActivatedRoute, Router} from "@angular/router";
@Component({
  templateUrl: './updateChannel.html'
})
export class UpdateChannelComponent implements OnInit {
  channelId: any;
  channelBrand: any;

  channelBrandId: any;
  channelName: any;
  province: any;
  city: any;
  area: any;
  address: any;
  center: any;
  zoom: any;

  constructor(
    private service: OrganizationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.channelId = this.route.snapshot.params.id;

    this.service.getChannel({channelId: this.channelId}).then(data => {
      if (data.resultCode === 'SUCCESS') {
        this.channelBrandId = data.resultData.channel_type_id;
        this.channelName = data.resultData.name;
        this.province = data.resultData.province;
        this.area = data.resultData.area;
        this.address = data.resultData.address;
        this.center = data.resultData.geo_coord;
        this.zoom = data.resultData.zoom;
      }
    });

      this.service.getChannelBrand().then(data => {
        if (data.resultCode === 'SUCCESS') {
          this.channelBrand = data.resultData;
        }
      })

  }

  // 获取地址信息
  changeEvent(event: any) {
    this.center = event.center;
    this.province = event.province;
    this.city = event.city;
    this.area = event.district;
    this.address = event.address;
    this.zoom = event.zoom;
  }

  onChannelBrandChange(event) {
    this.channelBrandId = event;
  }

  submit() {
    this.service.updateChannel({channelTypeId: 1,
      channelName: this.channelName,
      province: this.province,
      city: this.city,
      area: this.area,
      address: this.address,
      geoCoord: this.center,
      channelId: this.channelId, zoom: this.zoom}).subscribe(data => {

      if (data['resultCode'] === 'SUCCESS') {
        this.router.navigate(['organization/channel']);
      }
    });
  }


}
