import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
}
