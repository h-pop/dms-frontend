import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
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

  private documentType: DocumentType;
  private fieldTypes: string[];

  constructor(private route: ActivatedRoute, private router: Router, private documentTypeService: DocumentTypesService, private idGenerator: IdGenerator) { }

  ngOnInit(): void {
    this.fetchFieldTypes();
    this.fetchDocumentTypes();
    this.initializeMainFormGroup();
  }

  private fetchFieldTypes() {
    this.fieldTypes = this.documentTypeService.getFieldTypes();
  }

  private fetchDocumentTypes() {
    const documentTypeId = +this.route.snapshot.params.id;
    this.documentType = this.documentTypeService.getDocumentType(documentTypeId);
    if (this.documentType == null) {
      this.documentType = new DocumentType();
    }
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
    const control = new FormGroup({
      id: new FormControl(field && field.id || null),
      name: new FormControl(field && field.name || null, Validators.required),
      type: new FormControl(field && field.type || this.fieldTypes[0], Validators.required),
      defaultValue: new FormControl(field && field.defaultValue || null),
    });
    this.getFieldsFormArray().push(control);
  }

  getFieldsControls() {
    return this.getFieldsFormArray().controls;
  }

  onDeleteField(index: number) {
    this.getFieldsFormArray().removeAt(index);
  }

  onSubmit() {
    console.log(this.mainFormGroup);
    this.documentType.name = this.mainFormGroup.value.documentTypeName;
    // delete
    for (let index = 0; index < this.documentType.fields.length; index++) {
      const element = this.documentType.fields[index];
      const existingField = this.mainFormGroup.value.fields.find((value: Field) => value.id === element.id);
      if (!existingField) {
        this.documentType.fields.splice(index, 1);
      }
    }
    // create/update
    for (const field of this.mainFormGroup.value.fields) {
      if (field.id == null) {
        this.documentType.fields.push(new Field(field.name, field.type, field.defaultValue, this.idGenerator.next()));
        continue;
      }
      const existingField = this.documentType.fields.find((value: Field) => value.id === field.id);
      if (existingField) {
        existingField.name = field.name;
        existingField.type = field.type;
        existingField.defaultValue = field.defaultValue;
      }
    }
    this.documentTypeService.updateDocumentType(this.documentType);
    this.router.navigate(['..'], { relativeTo: this.route });
  }
}
