import {Injectable} from '@angular/core';
import {HttpService} from '../app.service';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable()
export class ShareService {

  constructor(private httpService: HttpService, private httpClient: HttpClient) {
  }

  getOrgTree(param) {
    return this.httpService.search('/orgTree', param);
  }

}
