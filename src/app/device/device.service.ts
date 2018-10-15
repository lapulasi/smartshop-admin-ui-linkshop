import {Injectable} from '@angular/core';
import {HttpService} from '../app.service';
import {HttpClient, HttpParams} from "@angular/common/http";
import {AdminHttpClient} from "../admin.httpclient";

@Injectable()
export class DeviceService {

  constructor(private httpService: HttpService, private http: HttpClient, private adminHttp: AdminHttpClient) {
  }

  listCompany() {
    return this.httpService.search('/company/list', null);
  }

  listBrand() {
    return this.httpService.search('/brand/list', null);
  }

  listShop(param) {
    return this.httpService.search('/shop/list', param);
  }

  circleList() {
    return this.httpService.search('/organ/shangquanList', null);
  }

  listDeviceVersion() {
    return this.httpService.search('/device/version/list', null);
  }

  pagingDevice(param) {
    return this.adminHttp.get('/device/page', param);
  }

  pagingDeviceVersion(uid) {
    return this.adminHttp.get('/device/' + uid, null);
  }

  insertDeviceVersion(param) {
    return this.httpService.save('/device/version/add', param);
  }

  updateDeviceVersionStatus(param) {
    return this.httpService.save('/device/version/update', param);
  }

  insertDevice(param) {
    return this.httpService.save('/device/add', param);
  }

  updateDevice(param) {
    return this.httpService.save('/device/update', param);
  }

  getDevice(param) {
    return this.httpService.search('/device/info', param);
  }

  pagingDeviceMsg(param) {
    return this.httpService.search('/device//msgs', param);
  }

  removeDevice(uid) {
    return this.http.delete<any>('/camera/' + uid, {params: null});
  }

  addDevice(shopId, deviceType, deviceModel, deviceSerial, validateCode, devName, devNo) {
    return this.http.post<any>('/device/camera/add', {
      shopId: shopId,
      deviceType: deviceType,
      deviceModel: deviceModel,
      deviceSerial: deviceSerial,
      validateCode: validateCode,
      devName: devName,
      devNo: devNo
    });
  }

}
