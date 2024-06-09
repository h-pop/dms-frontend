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
    sTable.create(container);
  }
}
