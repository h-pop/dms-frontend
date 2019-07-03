import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../environments/environment';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'Custom Document Management System';
    greeting = {};
    constructor(private http: HttpClient) {
        http.get(environment.API_URL + '/login/testRequest')
            .subscribe(data => this.greeting = data);
    }
}
