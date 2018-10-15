import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import { OrganizationService } from './organization.service';

@Injectable()
export class EmployeeResolve implements Resolve<any> {
  constructor(private service: OrganizationService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.service.getDevice({id: route.params['id']}).then(data => {
      return data;
    });
  }
}
