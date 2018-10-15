import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  template: `
    <div class="card" style="width:35%;">
      <div class="card-header">
        <strong>修改密码</strong>
      </div>
      <form class="form-horizontal" (ngSubmit)="submitForm()" #passwdForm="ngForm">
        <div class="card-block">
          <div class="form-group row">
            <label class="col-md-3 form-control-label" >原密码</label>
            <div class="col-md-9">
              <input [(ngModel)]="oldPasswd" name="oldPass" #oldPass="ngModel" required 
                     class="form-control" placeholder="请输入原密码" type="password">
              <span class="help-block tips-color" [hidden]="oldPass.valid || oldPass.pristine">请输入原密码</span>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-md-3 form-control-label" >新密码</label>
            <div class="col-md-9">
              <input [(ngModel)]="newPasswd" name="newPass" #newPass="ngModel" required
                     class="form-control" placeholder="请输入新密码" type="password">
              <span class="help-block tips-color" [hidden]="newPass.valid || newPass.pristine">请输入新密码</span>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-md-3 form-control-label" >确认新密码</label>
            <div class="col-md-9">
              <input [(ngModel)]="newPasswd2" name="newPass2" #newPass2="ngModel" required
                     class="form-control" placeholder="请确认新密码" type="password">
              <span class="help-block tips-color" [hidden]="newPass2.valid || newPass2.pristine">请确认新密码</span>
            </div>
          </div>
          <span style="color: red;">{{errorMsg}}</span>
        </div>
        <div class="card-footer">
          <button class="btn btn-sm btn-primary" type="submit" [disabled]="!passwdForm.form.valid">
            <i class="fa fa-dot-circle-o"></i> 提交
          </button>
        </div>
      </form>
     </div>
  `
})
export class UpdatePasswdComponent implements OnInit {

  oldPasswd: any;
  newPasswd: any;
  newPasswd2: any;
  errorMsg: any;
  userName: any;
  reg: any = /^\d{6,}$/;

  constructor(private http: HttpClient, private route: Router) {}

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    this.userName = user.realName;
  }

  submitForm() {
    if (this.newPasswd !== this.newPasswd2) {
      this.errorMsg = '请确认新密码';
      return false;
    }
    if (!this.reg.test(this.newPasswd)) {
      this.errorMsg = '至少输入六位数字';
      return false;
    }

    this.http.post<any>('/update/pwd',
      {oldPasswd: this.oldPasswd, newPasswd: this.newPasswd, userName: this.userName})
      .subscribe(data => {
      if (data.resultCode === 'SUCCESS') {
        alert(data.resultData);
        this.route.navigate(['/user/updatePasswd']);
      }else {
        this.errorMsg = data.errorMsg;
      }
    });



  }

}
