import {Injectable} from '@angular/core';
import {HttpService} from '../app.service';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class SystemService {

  constructor(private httpService: HttpService,
              private httpClient: HttpClient) {
  }

  faceDetect(param) {
    return this.httpService.search('/recog/faceImage/similarity', param);
  }

  propertyInspection(param) {
    return this.httpService.search('/recog/faceImage/attribute', param);
  }

  faceUrl(param) {
    return this.httpService.search('/recog/faceUrl/similarity', param);
  }

  propertyUrl(param) {
    return this.httpService.search('/recog/faceUrl/attribute', param);
  }

}
