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
  fieldTypes: string[];

  constructor(private route: ActivatedRoute, private documentTypeService: DocumentTypesService) { }

  ngOnInit(): void {
    this.fieldTypes = this.documentTypeService.getFieldTypes();

    const documentTypeId = +this.route.snapshot.params['id'];
    this.documentType = this.documentTypeService.getDocumentType(documentTypeId);
    this.route.params
      .subscribe(
        (params: Params) => {
          this.documentType = this.documentTypeService.getDocumentType(+params['id']);
        }
      );
    if (this.documentType == null) {
      this.documentType = new DocumentType();
      this.onAddField();
    }
  }

  onAddField() {
    this.documentType.fields.push(new Field());
  }

  onDeleteField(index: number) {
    this.documentType.fields.splice(index, 1);
  }

  onSaveChanges() {

  }
}
