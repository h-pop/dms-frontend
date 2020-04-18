import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
    selector: 'app-oauth',
    templateUrl: './oauth.component.html',
    styleUrls: ['./oauth.component.css']
})
export class OauthComponent implements OnInit {

    constructor(private http: HttpClient) { }

    ngOnInit(): void {
        const headers = {
            'Authorization': 'Basic ' + btoa('admin:admin')
        };
        //TODO
    }

}
