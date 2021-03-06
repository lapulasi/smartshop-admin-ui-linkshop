import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

export class AdminHttpClient extends HttpClient {

  get(url: string, params?: any): Observable<any> {
    return super.get<any>(url, {params: this.getHttpParams(params)});
  }
  private getHttpParams(params: any): HttpParams {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        httpParams = httpParams.set(key.toString(), params[key]);
      });
    }
    return httpParams;
  }
}
