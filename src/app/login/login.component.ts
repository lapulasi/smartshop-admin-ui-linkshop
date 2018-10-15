import {Component, OnInit} from '@angular/core';
import {User} from './classes/User';
import {LoginService} from './login.service';
import {OrgService} from "../organization/orgService";
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {

  user: User = new User('', '');
  returnUrl;
  status = true;

  constructor(private service: LoginService,
              private route: ActivatedRoute,
              private router: Router,
              private loginService: LoginService,
              private orgServie: OrgService) {
  }

  ngOnInit() {
    this.service.logOut();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
    // console.log('returnUrl----' + this.returnUrl);
  }

  submitForm() {
    this.status = false;
    this.loginService.login(this.user.userName, this.user.userPwd).subscribe(data => {
      const token = data.access_token
      localStorage.setItem('token', JSON.stringify(token));
      localStorage.setItem('token_obj', JSON.stringify(data));
      if (token) {
        this.status = true;
        this.getUser(token);
      }
    });
  }

  getUser(token) {
    this.orgServie.getUser(token, this.user.userName).subscribe(data => {
      if (data.roles) {
        if (data.roles.indexOf('ROLE_ADMIN') > -1) {
          data.companyId = 0
        }
      }
      localStorage.setItem('currentUser', JSON.stringify(data));
      // console.log(this.returnUrl);
      this.router.navigate(['/']);
    })
  }
}
