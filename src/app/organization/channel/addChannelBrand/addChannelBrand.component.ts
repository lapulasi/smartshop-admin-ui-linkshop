import {Component, OnInit} from '@angular/core';
import {OrganizationService} from '../../organization.service';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  templateUrl: './addChannelBrand.html'
})
export class AddChannelBrandComponent implements OnInit {

  channelBrandName;

  constructor(private service: OrganizationService,
              private router: Router) {
  }

  ngOnInit() {

  }

  query() {
    this.service.addChannelBrand({
      channelTypeName: this.channelBrandName
    }).subscribe(data => {
      console.log(JSON.stringify(data, null, 4));
      if (data['resultCode'] === 'SUCCESS') {
        this.router.navigate(['organization/channel']);
      }
    })
  }
}
