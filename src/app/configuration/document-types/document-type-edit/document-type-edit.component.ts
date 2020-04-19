import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DocumentTypesService } from '../document-types.service';
import { DocumentType, Field } from '../document-type.model';

@Component({
  selector: 'app-document-type-edit',
  templateUrl: './document-type-edit.component.html',
  styleUrls: ['./document-type-edit.component.css']
})
export class DocumentTypeEditComponent implements OnInit {

  documentType: DocumentType;

  constructor(private route: ActivatedRoute, private documentTypeService: DocumentTypesService) { }

  ngOnInit(): void {
    const documentTypeId = +this.route.snapshot.params['id'];
    this.documentType = this.documentTypeService.getDocumentType(documentTypeId);
    this.route.params
      .subscribe(
        (params: Params) => {
          this.documentType = this.documentTypeService.getDocumentType(+params['id']);
        }
      );
  }

  onAdd() {
    this.documentType.fields.push(new Field('','',''));
  }

  onSaveChanges() {
    
  }

  onDelete(index: number) {
    this.documentType.fields.splice(index, 1);
  }
}
