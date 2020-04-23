import { Component, OnInit } from '@angular/core';
import { DocumentTypesService } from '../configuration/document-types/document-types.service';
import { DocumentType } from '../configuration/document-types/document-type.model';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-new-document',
  templateUrl: './new-document.component.html',
  styleUrls: ['./new-document.component.css']
})
export class NewDocumentComponent implements OnInit {

  selectedDocumentTypeId: number;
  mainFormGroup: FormGroup;
  documentTypes: DocumentType[];
  documentType: DocumentType;

  constructor(private documentTypesService: DocumentTypesService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.documentTypes = this.documentTypesService.getDocumentTypes();
    this.initFormGroup();
  }

  onDocumentTypeChange() {
    this.getFieldsFormArray().clear();
    this.documentType = this.getSelectedDocumentType();
    this.documentType.fields.forEach(element => {
      const validators = element.required ? [Validators.required] : [];
      const control = this.formBuilder.control(element.defaultValue, validators);
      this.getFieldsFormArray().push(control);
    });
  }

  getFieldsControls() {
    return this.getFieldsFormArray().controls;
  }

  onClear() {
    this.getFieldsFormArray().reset();
  }

  onSubmit() {
    console.log(this.mainFormGroup);
  }

  private initFormGroup() {
    this.mainFormGroup = this.formBuilder.group({
      documentType: this.formBuilder.control(null, Validators.required),
      fields: this.formBuilder.array([])
    });
  }

  private getSelectedDocumentType(): DocumentType {
    return this.mainFormGroup.get('documentType').value;
  }

  private getFieldsFormArray(): FormArray {
    return (this.mainFormGroup.get('fields') as FormArray);
  }

}
