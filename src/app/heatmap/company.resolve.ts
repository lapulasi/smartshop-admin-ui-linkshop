import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {OrgService} from '../organization/orgService';
import {Injectable} from '@angular/core';

@Injectable()
export class CompanyResolve implements Resolve<any> {

  constructor(private orgService: OrgService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    let companyId = JSON.parse(localStorage.getItem('currentUser')).companyId;
    if(!companyId) {
      companyId = 0;
    }

    return this.orgService.getCompanyList(companyId);
  }

}
