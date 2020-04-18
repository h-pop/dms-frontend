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
        this.loginService.obtainAccessToken(this.credentials);
    }

    capSignIn() {
        window.location.assign('http://localhost:3000/login?response_type=code&client_id=dms_frontend_client_id&state=someGeneratedState');
    }
}
