import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentTypesService } from '../document-types.service';
import { DocumentType, Field } from '../document-type.model';
import { FormControl, FormArray, FormGroup, Validators } from '@angular/forms';
import { IdGenerator } from 'src/app/shared/id-generator.service';
import { DictionariesService } from '../../dictionaries/dictionaries.service';
import { Dictionary, DictionaryValue } from '../../dictionaries/dictionary.model';

@Component({
  selector: 'app-document-type-edit',
  templateUrl: './document-type-edit.component.html',
  styleUrls: ['./document-type-edit.component.css']
})
export class DocumentTypeEditComponent implements OnInit {


  mainFormGroup: FormGroup;
  // FIXME problem with two or more dictionary type fields 
  selectedDictionaryValues: DictionaryValue[];

  private documentType: DocumentType;
  private dictionaries: Dictionary[];
  private fieldTypes: string[];

  constructor(private route: ActivatedRoute,
    private router: Router,
    private documentTypeService: DocumentTypesService,
    private idGenerator: IdGenerator,
    private dictionariesService: DictionariesService) { }


  ngOnInit(): void {
    this.fieldTypes = this.documentTypeService.getFieldTypes();
    this.dictionaries = this.dictionariesService.getDictionaries();
    this.fetchDocumentTypes();
    this.initializeMainFormGroup();
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
      id: new FormControl(field && field.id),
      name: new FormControl(field && field.name, Validators.required),
      type: new FormControl(field && field.type || this.fieldTypes[0], Validators.required),
      defaultValue: new FormControl(field && field.defaultValue),
      defaultValueParent: new FormControl(field && field.defaultValueParent)
    });
    if (field && field.defaultValueParent) {
      this.onDictionaryChange(field.defaultValueParent);
    }
    this.getFieldsFormArray().push(control);
  }

  onTypeChange(fieldIndex: number) {
    const fieldControl = this.getFieldsControls()[fieldIndex];
    fieldControl.patchValue({
      defaultValue: null,
      defaultValueParent: null
    });
    this.selectedDictionaryValues = [];
  }

  getFieldsControls() {
    return this.getFieldsFormArray().controls;
  }

  // TODO get users from service
  getUsers(): string[] {
    return ['User 1', 'User 2'];
  }

  onDeleteField(index: number) {
    this.getFieldsFormArray().removeAt(index);
  }

  onDictionaryChange(value: string) {
    let found = false;
    const valueAsNumber = +value;
    this.dictionaries.forEach(dictionary => {
      if (dictionary.id === valueAsNumber) {
        this.selectedDictionaryValues = dictionary.dictionaryValues;
        found = true;
      }
    });
    if (!found) {
      this.selectedDictionaryValues = [];
    }
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
        existingField.defaultValueParent = field.defaultValueParent;
      }
    }
    this.documentTypeService.updateDocumentType(this.documentType);
    this.router.navigate(['..'], { relativeTo: this.route });
  }
}
