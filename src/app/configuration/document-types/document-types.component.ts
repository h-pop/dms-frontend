import { Component, OnInit } from '@angular/core';
import { DocumentTypesService } from './document-types.service';
import { DocumentType } from './document-type.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-document-types',
  templateUrl: './document-types.component.html',
  styleUrls: ['./document-types.component.css']
})
export class DocumentTypesComponent implements OnInit {

  documentTypes: DocumentType[];

  constructor(private documentTypesService: DocumentTypesService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.documentTypes = this.documentTypesService.getDocumentTypes();
    this.documentTypesService.documentTypesChanged
      .subscribe(
        (documentTypes: DocumentType[]) => {
          this.documentTypes = documentTypes;
        }
      );
  }

  onNew() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  onListItemClick(value: string) {
    this.router.navigate([value], { relativeTo: this.route });
  }

  onDeleteClick(index: number) {
    this.documentTypesService.deleteDocumentType(index);
  }

}
