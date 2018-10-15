import {Injectable} from '@angular/core';
import {HttpService} from '../app.service';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Http, RequestOptions, URLSearchParams} from '@angular/http';

@Injectable()
export class InventoryService {
  private url = environment.service_url;

  constructor(private httpService: HttpService,
              private http: Http) {
  }

  search(path, params) {
    return this.http
      .get(this.getUrl(path), this.requestOptions(params));
  }

  private getUrl(path) {
    return this.url + path;
  }

  private requestOptions(queryParam): RequestOptions {
    const requestOptions = new RequestOptions();
    requestOptions.params = this.urlSearchParams(queryParam);
    return requestOptions;
  }

  private urlSearchParams(queryParam): URLSearchParams {
    const params = new URLSearchParams();
    if (queryParam) {
      for (const key in queryParam) {
        params.set(key.toString(), queryParam[key]);
      }
    }
    return params;
  }

  overView() {
    return this.httpService.search('/device/camera/summ', null);
  }

  outReconds(param) {
    return this.httpService.search('/device/camera/store/logs', param);
  }

  deviceDetail(param) {
    return this.httpService.search('/device/camera/detail', param);
  }

  compare() {
    return this.httpService.search('/device/camera/sync', null);
  }

  exportExcel(param) {
    const path = this.httpService.getUrl('/device/camera/excel')
    const params = this.httpService.requestOptions(param).params;
    console.log(path + '?' + params);
    const excel_url = path + '?' + params;
    return excel_url
    // return this.httpService.search('/camera/excel', param);
  }

  editeRemark(param) {
    return this.httpService.search('/device/update/remark', param);
  }

}
