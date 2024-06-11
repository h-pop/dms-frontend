import { AfterViewInit, Component, OnInit } from '@angular/core';

declare var sTable;

@Component({
  selector: 'app-document-repository',
  templateUrl: './document-repository.component.html',
  styleUrls: ['./document-repository.component.css']
})
export class DocumentRepositoryComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const container = document.querySelector('#s-table-container');
    const sTableConfig = {
      data: [
        { "id": 1, "name": "John Doe", "age": 30, "email": "john.doe@example.com", "active": true },
        { "id": 2, "name": "Jane Smith", "age": 25, "email": "jane.smith@example.com", "active": false },
        { "id": 3, "name": "Mike Johnson", "age": 35, "email": "mike.johnson@example.com", "active": true },
        { "id": 4, "name": "Emily Davis", "age": 28, "email": "emily.davis@example.com", "active": true }
      ],
      columns: [
        { name: 'id' },
        { name: 'name' },
        { name: 'age' },
        { name: 'email' },
        { name: 'active' }
      ]
    }
    sTable.create(container, sTableConfig);
  }
}
