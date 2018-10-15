import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import { EmployeeService } from './employee.service';

@Injectable()
export class EmployeeResolve implements Resolve<any> {
  constructor(private service: EmployeeService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.service.getDevice({id: route.params['id']}).then(data => {
      return data;
    });
  }
}
