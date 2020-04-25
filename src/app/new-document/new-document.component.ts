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
  uploadedDocument;
  uploadedDocumentMetadata: { name: string, size: string };

  constructor(private documentTypesService: DocumentTypesService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.documentTypes = this.documentTypesService.getDocumentTypes();
    this.initFormGroup();
  }

  onDocumentTypeChange() {
    this.getFieldsFormArray().clear();
    this.documentType = this.getSelectedDocumentType();
    this.documentType.fields.forEach(element => {
      this.getFieldsFormArray().push(this.formBuilder.group({}));
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

  onFileChange(event) {
    let file = event.target.files[0];
    this.uploadedDocumentMetadata = {
      name: file.name,
      size: file.size
    }
    let reader = new FileReader();
    reader.onload = (e: any) => {
      this.uploadedDocument = e.target.result;
    };
    reader.readAsArrayBuffer(file);
  }

  private initFormGroup() {
    this.mainFormGroup = this.formBuilder.group({
      documentType: this.formBuilder.control(null, Validators.required),
      fields: this.formBuilder.array([]),
      documentFileInput: this.formBuilder.control(null, Validators.required)
    });
  }

  private getSelectedDocumentType(): DocumentType {
    return this.mainFormGroup.get('documentType').value;
  }

  private getFieldsFormArray(): FormArray {
    return (this.mainFormGroup.get('fields') as FormArray);
  }

}
