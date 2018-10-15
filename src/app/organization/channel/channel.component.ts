import {Component, OnInit} from '@angular/core';
import {OrganizationService} from '../organization.service';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  templateUrl: './channel.html'
})
export class ChannelComponent implements OnInit {

  channelBrand;
  channelBrandId;
  channelBrandList;

  constructor(private service: OrganizationService,
              private router: Router) {
  }

  ngOnInit() {
    this.getChannelBrand();
  }

  getChannelBrand() {
    this.service.getChannelBrand().then(data => {
      if (data.resultCode === 'SUCCESS') {
        this.channelBrand = data.resultData;
      }
    })
  }

  onChannelBrandChange(event) {
    this.channelBrandId = event;
  }

  query() {
    this.service.checkChannelBrand({
     channelTypeId: this.channelBrandId,
    }).then(data => {
      console.log(data);
      if (data.resultCode === 'SUCCESS') {
        this.channelBrandList = data.resultData;
      }
    })
  }

  addChannelBrand() {
    this.router.navigate(['/organization/channel/addChannelBrand']);
  }

  addChannel() {
    this.router.navigate(['/organization/channel/addChannel']);
  }
}
