import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SystemService} from "../system.service";
import {OrgService} from "../../organization/orgService";
import {environment} from "../../../environments/environment";

@Component({
  templateUrl: './faceContrast.html',
  styles: ['.hidden{display: none !important;} /deep/ .customClass { background-color: #f8f8f8;border-radius: 3px ;border: #d0d0d0 dashed 1px;font-family: sans-serif; position: relative;color: #9b9b9b;}' +
  '/deep/ .customClass .img-ul-container{background-color: transparent !important;} ' +
  '/deep/ .customClass .img-ul-upload {background-color: #3c9 !important;} ' +
  '/deep/ .customClass .img-ul-image, img{width: 270px !important; height: 270px !important;} img{margin-top: 20px}' +
  '.input{width:300px; height:40px; margin-top:20px} button,.result{margin-top:20px} .result p{line-height:40px}']
})
export class FaceContrastComponent implements OnInit {
  path: 'http://pic32.photophoto.cn/20140711/0011024086081224_b.jpg';
  urlPath1: any;
  urlPath2: any;
  isUrl: boolean = false;
  faceImage1: any;
  faceImage2: any;
  result: any;
  imagePath: any;

  constructor(private systemService: SystemService,
              private orgService: OrgService) {
    this.imagePath = environment.service_url;
    console.log(this.imagePath)
  }

  ngOnInit() {

  }

  uploadImg1() {
    if (this.urlPath1 !== undefined && this.urlPath1 !== '') {
      this.isUrl = true;
    } else {
      this.isUrl = false;
    }

  }

  uploadImg2() {
    if (this.urlPath2 !== undefined && this.urlPath2 !== '') {
      this.isUrl = true;
    } else {
      this.isUrl = false;
    }

  }

  onUploadFinished1(e) {
    console.log(JSON.stringify(e.serverResponse, null, 4))
    let serveData = JSON.parse(e.serverResponse.response._body);
    if (serveData.resultCode === 'SUCCESS') {
      this.faceImage1 = serveData.resultData;
    }
  }

  onUploadFinished2(e) {
    let serveData = JSON.parse(e.serverResponse.response._body);
    if (serveData.resultCode === 'SUCCESS') {
      this.faceImage2 = serveData.resultData;
    }
  }

  detect() {
    if (!this.isUrl) {
      this.orgService.faceDetect({
        image1: this.faceImage1,
        image2: this.faceImage2
      }).subscribe(data => {
        if (data.resultCode === 'SUCCESS') {
          this.result = data.resultData.similarity;
        }else {
          alert(data.errorMsg);
        }
      })
    } else {
      this.orgService.faceUrl({
        url1: this.urlPath1,
        url2: this.urlPath2
      }).subscribe(data => {
        if (data.resultCode === 'SUCCESS') {
          this.result = data.resultData.similarity;
        }else {
          alert(data.errorMsg);
        }
      })
    }

  }
}
