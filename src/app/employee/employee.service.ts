import {Injectable} from '@angular/core';
import {HttpService} from '../app.service';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable()
export class EmployeeService {

  constructor(private httpService: HttpService,
              private httpClient: HttpClient) {
  }

  listCompany() {
    return this.httpService.search('/company/list', null);
  }

  getOrgTree(param) {
    return this.httpService.search('/orgTree', param);
  }

  addEmployee(param) {
    return this.httpClient.post('/user/', param);
  }

  circleList() {
    return this.httpService.search('/organ/shangquanList', null);
  }

  listBrand() {
    return this.httpService.search('/brand/list', null);
  }

  listShop(param) {
    return this.httpService.search('/shop/list', param);
  }

  listDeviceVersion() {
    return this.httpService.search('/device/version/list', null);
  }

  pagingDevice(param) {
    return this.httpService.search('/device/paging', param);
  }

  managerOnDuty(param) {
    return this.httpService.search('/user/manager/status', param);
  }

  employList(param) {
    return this.httpService.search('/user/list', param);
  }

  onDuty(param) {
    return this.httpService.search('/user/status', param);
  }

  pagingDeviceVersion(param) {
    return this.httpService.search('/device/version/paging', param);
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

  deleteUser(value1) {
    return this.httpClient.delete('/user/delete', {params: new HttpParams().set('userId', value1)});
  }


}
