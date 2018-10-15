import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import { DeviceService } from './device.service';

@Injectable()
export class DeviceResolve implements Resolve<any> {
  constructor(private service: DeviceService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.service.getDevice({id: route.params['id']}).then(data => {
      return data;
    });
  }
}
