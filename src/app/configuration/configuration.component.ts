import { Component, OnInit } from '@angular/core';
import { DocumentTypesService } from './document-types/document-types.service';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css'],
  providers: [DocumentTypesService]
})
export class ConfigurationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
