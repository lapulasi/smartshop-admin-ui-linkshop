import {Component, ViewChild} from '@angular/core';
import { DeviceService } from '../device.service';
import { Version } from '../classes/Version';
import { FileUploader } from 'ng2-file-upload';
import {ModalDirective} from 'ngx-bootstrap';
import { environment } from '../../../environments/environment';
import {Router} from '@angular/router';


@Component({
  templateUrl: './deviceVersionAdd.html',
  styles: [`.tips-color{color: #bd4147;}`]
})
export class DeviceVersionAddComponent {

  message;
  messageHidden = true;
  @ViewChild('staticModal') public staticModal: ModalDirective;

  private backendUrl = environment.service_url;
  uploader: FileUploader = new FileUploader({url: this.backendUrl + '/upload'});

  vs = new Version('', '', '', '');

  constructor(private service: DeviceService, private router: Router) {}

  toListPage() {
    this.router.navigate(['/device/deviceVersion']);
  }

  submitForm() {
    this.service.insertDeviceVersion(this.vs).then(data => {
      const code = data.resultCode;
      if (code === 'SUCCESS' ) {
        this.staticModal.show();
      }
    });
  }

  closeModal() {
    this.staticModal.hide();
    this.vs = new Version('', '', '', '');
  }

  selectedFileOnChanged(event) {
    // 打印文件选择名称
    this.message = '正在上传';
    this.messageHidden = false;
    this.uploadFile();
  }
  // D: 定义事件，上传文件
  uploadFile() {
    const _this = this;
    // 上传
    this.uploader.queue[0].onSuccess = function (response, status, headers) {
      // 上传文件成功
      if (status === 200) {
        const tempRes = JSON.parse(response);
        if (tempRes.resultCode === 'SUCCESS') {
          _this.message = '上传成功';
          _this.vs.path = tempRes.resultData;
        }
      } else {
        // 上传文件后获取服务器返回的数据错误
       // alert("");
      }
    };
    this.uploader.queue[0].upload(); // 开始上传
  }




}
