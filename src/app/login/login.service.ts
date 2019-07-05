import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class LoginService {

    authenticated = false;

    constructor(private http: HttpClient) { }

    public obtainAccessToken(credentials) {
        const body = new HttpParams()
            .set('username', credentials.username)
            .set('password', credentials.password)
            .set('grant_type', 'password');

        const headers = {
            'Authorization': 'Basic ' + btoa('USER_CLIENT_APP:dmsP4ssToBeEncrypted'),
            'Content-type': 'application/x-www-form-urlencoded'
        };
        this.http.post('http://localhost:8080/oauth/token', body.toString(), { headers }).subscribe(data => {
            window.sessionStorage.setItem('token', JSON.stringify(data));
            console.log(window.sessionStorage.getItem('token'));
            // TODO navigate to application
            // this.router.navigate(['list-user']);
        }, error => {
            alert(error.error.error_description);
        });
    }
}
