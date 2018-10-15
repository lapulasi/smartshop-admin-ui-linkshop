import {Injectable} from '@angular/core';
import {URLSearchParams, RequestOptions} from '@angular/http';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {AdminHttpClient} from '../admin.httpclient';

@Injectable()

export class OrgService {
  // private _url = environment.service_url;

  constructor(private httpClient: HttpClient,
              private adminHttp: AdminHttpClient) {
  }

  // search(path, params) {
  //   return this.http
  //     .get(this.getUrl(path), this.requestOptions(params))
  //     .toPromise()
  //     .then(res => res.json());
  // }

  // save(path, params) {
  //   const headers = new Headers({'Content-Type': 'application/json'});
  //   return this.http.post(this.getUrl(path), params, new RequestOptions({headers: headers}))
  //     .toPromise()
  //     .then(res => res.json());
  // }

  getUrl(path) {
    return path;
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

  getOrgTree_(param) {
    return this.adminHttp.get('/org/tree', param);
    // return this.search('/org/tree', param);
  }

  creatOrganization(param) {
    return this.httpClient.post(this.getUrl('/org/add'), param);
  }

  updateOrganization(orgId: any, param) {
    return this.httpClient.put<any>(this.getUrl('/org/update/' + orgId), param);
  }

  addCompanyList(param) {
    return this.httpClient.post(this.getUrl('/org/company'), param);
  }

  getCompanyList(companyId) {
    /* return this.search('/org/company/0', param);*/
    return this.httpClient.get<any>('/org/company/' + companyId + '?page=0')
  }

  getOrgInfo(orgId: any) {
    return this.httpClient.get<any>(this.getUrl('/org/' + orgId), {params: null})
  }

  getOrgPolygon(orgId: any) {
    return this.httpClient.get(this.getUrl('/org/polygon/' + orgId), {params: null})
  }

  getOrgLevel(levelId: any) {
    return this.httpClient.get<any>(this.getUrl('/org/level/next/' + levelId), {params: null});
  }

  getShop(shopId: any) {
    return this.httpClient.get<any>(this.getUrl('/org/shop/' + shopId), {params: null})
  }

  updateShop(shopId: any, param) {
    return this.httpClient.put<any>(this.getUrl('/org/shop/update/' + shopId), param);
  }

  getDistrictCode(keywords: any) {
    /*http://restapi.amap.com/v3/config/district?keywords=%E7%A6%8F%E7%94%B0%E5%8C%BA&key=87533684b7544d151e6b245cf33dd8b7&subdistrict=*/
    const key = '87533684b7544d151e6b245cf33dd8b7';
    return this.httpClient.get<any>('http://restapi.amap.com/v3/config/district?keywords=' + keywords + '&key=' + key + '&subdistrict=0', {params: null});
  }

  getGeoCode(address: any) {
    const key = '87533684b7544d151e6b245cf33dd8b7';
    return this.httpClient.get<any>('http://restapi.amap.com/v3/geocode/geo?address=' + address + '&key=' + key, {params: null});
  }

  deleteOrg(value) {
    return this.httpClient.delete<any>(this.getUrl('/org/') + value, {params: null});
  }

  getLevelList(companyId: any) {
    return this.httpClient.get<any>(this.getUrl('/org/level/list/' + companyId), {params: null});
  }

  addLevel(param) {
    return this.httpClient.post(this.getUrl('/org/level/add'), param);
  }

  getLevelInfo(levelId: any) {
    return this.httpClient.get<any>(this.getUrl('/org/level/' + levelId), {params: null});
  }

  updateLevel(levelId: any, param) {
    return this.httpClient.put<any>(this.getUrl('/org/level/update/' + levelId), param);
  }

  deleteLevel(levelId: any) {
    return this.httpClient.delete<any>(this.getUrl('/org/level/') + levelId)
  }

  login(userName: any, password: any) {
    return this.httpClient.post<any>(this.getUrl('/oauth/token?grant_type=password&scope=read&client_id=adminUser&client_secret=sec3333&username=' + userName + '&password=' + password), null);
  }

  getUser(token, phone) {
    return this.httpClient.get<any>(this.getUrl('/user/?phone=' + phone));
  }

  addEmployee(token, companyId, belongOrgId, realName, phone) {
    return this.httpClient.post<any>(this.getUrl('/user/'), {
      companyId: companyId,
      belongOrgId: belongOrgId,
      realName: realName,
      phone: phone
    });
  }

  employList(orgCode, userId, page) {
    return this.httpClient.get<any>(this.getUrl('/user/page?orgCode=' + orgCode + '&userId=' + userId + '&page=' + page));
  }

  deleteUser(value1, token) {
    console.log(value1);
    return this.httpClient.delete<any>(this.getUrl('/user/' + value1));
    /*{params: new HttpParams().set('userId', value1)}*/
  }

  onDuty(orgCode, page) {
    return this.httpClient.get<any>(this.getUrl('/org/staff/?&orgCode=' + orgCode + '&page=' + (page - 1)));
  }

  managerOnDuty(orgCode, startDate, endDate, page) {
    return this.httpClient.get<any>(this.getUrl('/org/manage?orgCode=' + orgCode + '&startDate=' + startDate + '&endDate=' + endDate + '&page=' + (page - 1)));
  }

  orgAuthorization(userId: any, token, orgIds) {
    return this.httpClient.put<any>(this.getUrl('/user/permission/' + userId + '?orgIds=' + orgIds), {})
  }

  userInfo(userId) {
    return this.httpClient.get<any>(this.getUrl('/user/' + userId));
  }

  pagingAccessShop(orgId: any, param) {
    return this.adminHttp.get('/guest/accesslog/' + orgId, param);
  }

  pagingGuest(orgId: any, param) {
    return this.adminHttp.get('/guest/shopguest/' + orgId, param);
  }

  addToExcludeList(orgId, shopId, guestId) {
    return this.httpClient.post<any>('/guest/excluded/' + orgId, {shopId: shopId, guestId: guestId});
  }

  searchFault(orgId: any, param) {
    return this.adminHttp.get('/guest/excluded/' + orgId, param);
  }

  faceDetect(param) {
    return this.adminHttp.get('/recog/faceImage/similarity', param);
  }

  propertyInspection(param) {
    return this.adminHttp.get('/recog/faceImage/attribute', param);
  }

  faceUrl(param) {
    return this.adminHttp.get('/recog/faceUrl/similarity', param);
  }

  propertyUrl(param) {
    return this.adminHttp.get('/recog/faceUrl/attribute', param);
  }

  getDevice(param) {
    return this.adminHttp.get('/org/dashboard/device', param);
  }

  getFace(param) {
    return this.adminHttp.get('/org/dashboard/msg', param);
  }

  getSales(param) {
    return this.adminHttp.get('/org/dashboard/sales', param);
  }

  dashbroad() {
    return this.adminHttp.get('/org/dashboard/orgs');
  }

  getUserInfo(param) {
    return this.adminHttp.get('/user/page', param);
  }
}
