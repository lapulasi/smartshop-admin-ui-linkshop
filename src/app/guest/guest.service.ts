import {Injectable} from '@angular/core';
import {HttpService} from '../app.service';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable()
export class GuestService {

  constructor(private httpService: HttpService, private httpClient: HttpClient) {
  }

  listCompany() {
    return this.httpService.search('/company/list', null);
  }

  listShop(param) {
    return this.httpService.search('/shop/list', param);
  }

  pagingGuest(param) {
    return this.httpService.search('/guest/paging', param);
  }

  pagingAccessShop(param) {
    return this.httpService.search('/access/shop/paging', param);
  }

  addToExcludeList(param) {
    return this.httpService.save('/guest/excluded', param);
  }

  searchFault(param) {
    return this.httpService.search('/guest/excluded', param);
  }

  deleteFault(value1, value2) {
    return this.httpClient.delete('/guest/excluded', {params: new HttpParams().set('shopId', value1).set('guestId', value2)});
  }

}
