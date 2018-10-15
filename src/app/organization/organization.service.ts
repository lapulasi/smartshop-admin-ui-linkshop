import {Injectable} from '@angular/core';
import {HttpService} from '../app.service';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable()
export class OrganizationService {

  constructor(private httpService: HttpService, private httpClient: HttpClient) {
  }

  getOrgInfo(para) {
    return this.httpService.search('/organ', para);
  }

  getOrgPolygon(para) {
    return this.httpService.search('/organ/polygon', para);
  }

  creatShop(param) {
    return this.httpClient.post('/shop', param);
    // return this.httpService.save('/shop', param);
  }

  updateShop(param) {
    return this.httpClient.put('/shop', param);
  }

  getShop(param) {
    return this.httpService.search('/shop', param);
  }

  creatOrganization(param) {
    return this.httpClient.post('/organ', param);
  }

  updateOrganization(param) {
    return this.httpClient.put('/organ', param);
  }

  getChannelList() {
    return this.httpService.search('/channelList', null);
  }

  listCompany() {
    return this.httpService.search('/company/list', null);
  }

  getOrgTree(param) {
    return this.httpService.search('/org/tree', param);
  }


  pagingDevice(param) {
    return this.httpService.search('/device/paging', param);
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

  getCompanyList() {
    return this.httpService.search('/company/', null);
  }

  addCompanyList(param) {
    return this.httpClient.post('/company/', param);
  }

  getChannelBrand() {
    return this.httpService.search('/channel/channelType', null);
  }

  checkChannelBrand(param) {
    return this.httpService.search('/channel/', param);
  }

  addChannelBrand(param) {
    return this.httpClient.post('/channel/channelType', param);
  }

  addChannel(param) {
    return this.httpClient.post('/channel/', param);
  }

  deleteOrg(key, value) {
    return this.httpClient.delete('/org/' + value, {params: new HttpParams().set(key, value)} );
  }
  getChannel(param) {
    return this.httpService.search('/channel/channel', param);
  }
  updateChannel(param) {
    return this.httpClient.put('/channel/', param);
  }
}
