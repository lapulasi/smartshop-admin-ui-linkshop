import {Injectable} from "@angular/core";
import {AdminHttpClient} from "../admin.httpclient";

@Injectable()
export class HeatMapService {

  constructor(private httpClient: AdminHttpClient) {}

  getShopsByOrgCode(orgCode: any) {
    return this.httpClient.get('/org/shops', {orgCode: orgCode})
  }

}
