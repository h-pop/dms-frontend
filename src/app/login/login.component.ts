import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {

    credentials = { username: '', password: '' };
    error = false;

    constructor(private loginService: LoginService, private router: Router) { }

    login() {
        this.loginService.login(this.credentials, () => {
            this.error = !this.loginService.authenticated;
            if (!!this.loginService.authenticated) {
                this.loginService.getUserData();
            }
            // this.router.navigateByUrl('/home');
        });
        return false;
    }

    login2() {
        this.loginService.obtainAccessToken(this.credentials);
    }
}
