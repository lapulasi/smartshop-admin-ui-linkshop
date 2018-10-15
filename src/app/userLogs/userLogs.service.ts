import {Injectable} from '@angular/core';
import {AdminHttpClient} from '../admin.httpclient';

@Injectable()

export class UserLogsService {
  constructor(private adminHttp: AdminHttpClient) {
  }

  getUserPageList(param) {
    return this.adminHttp.get('/user/page/list', param)
  }

  getUserEventList(param) {
    return this.adminHttp.get('/user/event/list', param)
  }

}
