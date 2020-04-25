import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Field } from 'src/app/configuration/document-types/document-type.model';
import { DictionariesService } from 'src/app/configuration/dictionaries/dictionaries.service';
import { DocumentTypesService } from 'src/app/configuration/document-types/document-types.service';
import { DictionaryValue } from 'src/app/configuration/dictionaries/dictionary.model';

@Component({
  selector: 'app-document-field',
  templateUrl: './document-field.component.html',
  styleUrls: ['./document-field.component.css']
})
export class DocumentFieldComponent implements OnInit {

  @Input() documentFieldGroup: FormGroup;
  @Input() documentField: Field;

  selectedDictionaryValues: DictionaryValue[];

  constructor(private dictionariesService: DictionariesService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initializeDocumentFieldGroup();
    if (this.documentField?.type === 'dictionary' && this.documentField?.defaultValueParent) {
      this.selectedDictionaryValues = this.dictionariesService.getDictionary(+this.documentField.defaultValueParent).dictionaryValues;
    }
  }
  // TODO get users from service
  getUsers(): string[] {
    return ['User 1', 'User 2'];
  }

  private initializeDocumentFieldGroup() {
    const validators = this.documentField.required ? [Validators.required] : [];
    this.documentFieldGroup.addControl('fieldValueParent', this.formBuilder.control(this.documentField?.defaultValueParent, validators));
    this.documentFieldGroup.addControl('fieldValue', this.formBuilder.control(this.documentField?.defaultValue, validators));
  }
}
