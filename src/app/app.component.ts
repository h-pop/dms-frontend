import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dms-frontend';
  greeting = {'id': 'XXX', 'content': 'Hello World'};
  greeting2 = {}
  constructor(private http: HttpClient) { 
	  http.get('/api/v1/protectedRequest').subscribe(data => this.greeting2 = data);
  }
}
