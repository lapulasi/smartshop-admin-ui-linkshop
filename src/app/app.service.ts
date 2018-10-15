import { Injectable } from '@angular/core';
import {Http, URLSearchParams, RequestOptions, Headers} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { environment } from '../environments/environment';

@Injectable()
export class HttpService {

  // private url = 'http://localhost:9898';
  private url = environment.service_url;
  constructor(private http: Http) {}

  search(path, params) {
    return this.http
      .get(this.getUrl(path), this.requestOptions(params))
      .toPromise()
      .then(res => res.json());
  }

  save(path, params) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(this.getUrl(path), params, new RequestOptions({headers: headers}))
      .toPromise()
      .then(res => res.json());
  }

  getUrl(path) {
    return this.url + path;
  }

  requestOptions(queryParam): RequestOptions {
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

}

