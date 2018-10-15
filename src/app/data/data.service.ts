import {Injectable} from '@angular/core';
import {AdminHttpClient} from '../admin.httpclient';
import {HttpService} from '../app.service';

@Injectable()

export class DataService {
  constructor(private adminHttp: AdminHttpClient,
              private httpService: HttpService) {
  }

  getLevelList(param) {
    return this.adminHttp.get('/org/code/level/', param)
  }

  getDwell(param) {
    return this.adminHttp.get('/org/stay/model', param)
  }

  getFlow(param) {
    return this.adminHttp.get('/org/guest/model', param)
  }

  getSales(param) {
    return this.adminHttp.get('/org/shop/model', param)
  }

  listOrgDevice(orgCode: any, levelId: any, startDate: any, endDate: any) {
    return this.adminHttp.get('/device/data/orgs', {orgCode: orgCode, levelId: levelId, startDate: startDate, endDate: endDate});
  }

  listShopDevice(orgId: any, startDate: any, endDate: any) {
    return this.adminHttp.get('/device/data/shops', {orgId: orgId, startDate: startDate, endDate: endDate});
  }

  exportDwellExcel(param) {
    const path = this.httpService.getUrl('/org/stay/export')
    const params = this.httpService.requestOptions(param).params;
    const excel_url = path + '?' + params;
    return excel_url
  }

  exportFlowExcel(param) {
    const path = this.httpService.getUrl('/org/guest/export')
    const params = this.httpService.requestOptions(param).params;
    const excel_url = path + '?' + params;
    // console.log(excel_url)
    return excel_url
  }

  exportSalesExcel(param) {
    const path = this.httpService.getUrl('/org/shop/export')
    const params = this.httpService.requestOptions(param).params;
    const excel_url = path + '?' + params;
    return excel_url
  }


}
