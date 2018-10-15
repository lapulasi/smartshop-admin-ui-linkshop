import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SystemService} from '../system.service';
import {OrgService} from "../../organization/orgService";
import {environment} from "../../../environments/environment";

@Component({
  templateUrl: './attrRecognition.html',
  styles: ['.hidden{display: none !important;} /deep/ .customClass { background-color: #f8f8f8;border-radius: 3px ;border: #d0d0d0 dashed 1px;font-family: sans-serif; position: relative;color: #9b9b9b;}' +
  '/deep/ .customClass .img-ul-container{background-color: transparent !important;} ' +
  '/deep/ .customClass .img-ul-upload {background-color: #3c9 !important;} ' +
  '/deep/ .customClass .img-ul-image, img{width: 270px !important; height: 270px !important;} img{margin-top:20px}' +
  '.input{width:300px; height:40px; margin-top:20px} button,.result{margin-top:20px} .result p{line-height:40px} ul{list-style:none}']
})
export class AttrRecognitionComponent implements OnInit {
  isUrl: boolean = false;
  urlPath: any;
  faceImage: any;
  result: any;
  gender: any;
  age: any;
  mood: any;
  imagePath: any;

  constructor(private systemService: SystemService,
              private orgService: OrgService) {
    this.imagePath = environment.service_url
  }

  ngOnInit() {

  }

  uploadImg() {
    if (this.urlPath !== undefined && this.urlPath !== '') {
      this.isUrl = true;
    } else {
      this.isUrl = false;
    }

  }

  onUploadFinished(e) {
    let serveData = JSON.parse(e.serverResponse.response._body);
    if (serveData.resultCode === 'SUCCESS') {
      this.faceImage = serveData.resultData;
    }
  }

  detect() {
    if (!this.isUrl) {
      this.orgService.propertyInspection({
        image: this.faceImage
      }).subscribe(data => {
        console.log(data)
        if (data.resultCode === 'SUCCESS') {
          let result = data.resultData;
          this.gender = result.gender;
          this.age = result.age;
          this.mood = result.mood;
        }else {
          alert(data.errorMsg);
        }
      })
    } else {
      this.orgService.propertyUrl({
        url: this.urlPath
      }).subscribe(data => {
        console.log(JSON.stringify(data, null, 4))
        if (data.resultCode === 'SUCCESS') {
          let result = data.resultData;
          this.gender = result.gender;
          this.age = result.age;
          this.mood = result.mood;
        }else {
          alert(data.errorMsg);
        }
      })
    }

  }

}
