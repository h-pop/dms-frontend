import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentTypesService } from '../document-types.service';
import { DocumentType, Field } from '../document-type.model';
import { FormControl, FormArray, FormGroup, Validators } from '@angular/forms';
import { IdGenerator } from 'src/app/shared/id-generator.service';

@Component({
  selector: 'app-document-type-edit',
  templateUrl: './document-type-edit.component.html',
  styleUrls: ['./document-type-edit.component.css']
})
export class DocumentTypeEditComponent implements OnInit {

  mainFormGroup: FormGroup;
  fields: Field[] = [];

  private documentType: DocumentType;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private documentTypeService: DocumentTypesService,
    private idGenerator: IdGenerator) { }


  ngOnInit(): void {
    this.fetchDocumentType();
    this.initializeMainFormGroup();
  }

  private fetchDocumentType() {
    const documentTypeId = +this.route.snapshot.params.id;
    this.documentType = this.documentTypeService.getDocumentType(documentTypeId);
    if (this.documentType == null) {
      this.documentType = new DocumentType();
    }
    console.log(this.documentType);
  }

  private initializeMainFormGroup() {
    this.mainFormGroup = new FormGroup({
      documentTypeName: new FormControl(this.documentType.name, Validators.required),
      fields: new FormArray([])
    });
    this.documentType.fields.forEach(element => {
      this.onAddField(element);
    });
  }

  private getFieldsFormArray(): FormArray {
    return (this.mainFormGroup.get('fields') as FormArray);
  }

  onAddField(field?: Field) {
    this.fields.push(field);
    this.getFieldsFormArray().push(new FormGroup({}));
  }

  onDeleteField(index: number) {
    this.fields.splice(index, 1);
    this.getFieldsFormArray().removeAt(index);
  }

  getFieldsControls() {
    return this.getFieldsFormArray().controls;
  }

  onSubmit() {
    console.log(this.mainFormGroup);
    this.documentType.name = this.mainFormGroup.value.documentTypeName;
    this.processFieldsDeletions();
    this.processFieldsUpdates();
    this.documentTypeService.updateDocumentType(this.documentType);
    this.router.navigate(['..'], { relativeTo: this.route });
  }

  private processFieldsDeletions() {
    for (let index = 0; index < this.documentType.fields.length; index++) {
      const element = this.documentType.fields[index];
      const existingField = this.mainFormGroup.value.fields.find((value: Field) => value.id === element.id);
      if (!existingField) {
        this.documentType.fields.splice(index, 1);
      }
    }
  }

  private processFieldsUpdates() {
    for (const field of this.mainFormGroup.value.fields) {
      if (field.id == null) {
        this.documentType.fields.push(new Field(field.name, field.type, field.defaultValue, this.idGenerator.next(), field.dictionaryId));
        continue;
      }
      const existingField = this.documentType.fields.find((value: Field) => value.id === field.id);
      if (existingField) {
        existingField.name = field.name;
        existingField.type = field.type;
        existingField.defaultValue = field.defaultValue;
        existingField.dictionaryId = field.dictionaryId;
        existingField.required = field.required;
      }
    }
  }
}
