import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DictionariesService } from 'src/app/configuration/dictionaries/dictionaries.service';
import { DictionaryValue, Dictionary } from 'src/app/configuration/dictionaries/dictionary.model';
import { DocumentTypesService } from '../../document-types.service';
import { Field } from '../../document-type.model';

@Component({
  selector: 'app-field-edit',
  templateUrl: './field-edit.component.html',
  styleUrls: ['./field-edit.component.css']
})
export class FieldEditComponent implements OnInit {

  @Input() fieldGroup: FormGroup;
  @Input() field: Field;

  @Output() deleteField = new EventEmitter<void>();

  selectedDictionaryValues: DictionaryValue[];

  private fieldTypes: string[];
  private dictionaries: Dictionary[];

  constructor(private dictionariesService: DictionariesService, private documentTypesService: DocumentTypesService) { }

  ngOnInit(): void {
    this.fieldTypes = this.documentTypesService.getFieldTypes();
    this.initForm();
    if (this.field?.defaultValueParent) {
      this.onDictionaryChange(this.field.defaultValueParent);
    }
  }

  initForm() {
    this.fieldGroup.addControl('id', new FormControl(this.field?.id));
    this.fieldGroup.addControl('name', new FormControl(this.field?.name, Validators.required));
    this.fieldGroup.addControl('type', new FormControl(this.field?.type || this.fieldTypes[0], Validators.required));
    this.fieldGroup.addControl('required', new FormControl(this.field?.required));
    this.fieldGroup.addControl('defaultValue', new FormControl(this.field?.defaultValue));
    this.fieldGroup.addControl('defaultValueParent', new FormControl(this.field?.defaultValueParent));
    console.log(this.fieldGroup);
  }

  onTypeChange() {
    this.fieldGroup.patchValue({
      defaultValue: null,
      defaultValueParent: null
    });
    this.selectedDictionaryValues = [];
  }

  onDictionaryChange(value: string) {
    const dictionary = this.dictionariesService.getDictionary(+value);
    this.selectedDictionaryValues = dictionary && dictionary.dictionaryValues || [];
  }

  onDeleteField() {
    this.deleteField.emit();
  }

  // TODO get users from service
  getUsers(): string[] {
    return ['User 1', 'User 2'];
  }

  getDictionaries() {
    if (!this.dictionaries) {
      this.dictionaries = this.dictionariesService.getDictionaries();
    }
    return this.dictionaries;
  }
}
