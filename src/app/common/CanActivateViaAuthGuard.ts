import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable()
export class CanActivateViaAuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('currentUser')) {
      return true;
    }
    this.router.navigate(['/login', { queryParams: { returnUrl: state.url }}]);
    return false;
  }
}

@Injectable()
export class CanActivateChildViaAuthGuard implements CanActivateChild {

  constructor(private router: Router, private http: HttpClient) {}

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('currentUser')) {
      const user = JSON.parse(localStorage.getItem('currentUser'));
      return true;
    }

    this.router.navigate(['/login', { queryParams: { returnUrl: state.url}}]);
    return false;
  }
}
