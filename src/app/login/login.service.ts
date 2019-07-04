import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class LoginService {

    authenticated = false;

    constructor(private http: HttpClient) { }

    public login(credentials, callback) {

        this.http.post<Observable<boolean>>(environment.API_URL + '/login', credentials)
            .subscribe(isValid => {
                if (isValid) {
                    sessionStorage.setItem(
                    'token',
                    btoa(credentials.username + ':' + credentials.password)
                    );
                    this.authenticated = true;
                } else {
                    this.authenticated = false;
                }
                return callback && callback();
            });
    }

    public getUserData() {
        const headers = new HttpHeaders({
            Authorization : 'Basic ' + sessionStorage.getItem('token')
        });

        this.http.get(environment.API_URL + '/validateLogin', {headers})
        .subscribe(response => {
            alert(response);
        });
    }

    public obtainAccessToken(credentials) {
        const body = new HttpParams()
            .set('username', credentials.username)
            .set('password', credentials.password)
            .set('grant_type', 'password');

        const headers = {
            'Authorization': 'Basic ' + btoa('dms-user:dms-secret'),
            'Content-type': 'application/x-www-form-urlencoded'
        };
        this.http.post('http://localhost:8080/' + 'oauth/token', body.toString(), { headers }).subscribe(data => {
            window.sessionStorage.setItem('token', JSON.stringify(data));
            console.log(window.sessionStorage.getItem('token'));
            // this.router.navigate(['list-user']);
        }, error => {
            alert(error.error.error_description);
        });
    }
}
