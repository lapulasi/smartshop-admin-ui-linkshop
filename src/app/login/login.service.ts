import { Injectable } from '@angular/core';
import { HttpService } from '../app.service';
import {AdminHttpClient} from "../admin.httpclient";

@Injectable()
export class LoginService {

  constructor(private httpService: HttpService, private http: AdminHttpClient) {}

  // login(param) {
  //   return this.httpService.save('/login', param);
  // }

  login(userName: any, password: any) {
    userName = userName.replace(/^\s+|\s+$/g,''); // 去掉两头空格
    return this.http.post<any>('/oauth/token?grant_type=password&scope=read&client_id=adminUser&client_secret=sec3333&username=' + userName + '&password=' + password, null);
  }

  logOut() {
    localStorage.removeItem('currentUser');
  }

}
