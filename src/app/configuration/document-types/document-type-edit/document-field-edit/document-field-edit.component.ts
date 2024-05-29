import { Component, OnInit, Input, EventEmitter, Output, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DictionariesService } from 'src/app/configuration/dictionaries/dictionaries.service';
import { DictionaryValue, Dictionary } from 'src/app/configuration/dictionaries/dictionary.model';
import { Field } from '../../document-type.model';
import moment from 'moment';
import { AppSettings } from 'src/app/shared/app.settings';
import { ValidationService } from 'src/app/shared/validation.service';
import { FieldTypeEnum } from 'src/app/shared/field-type.enum';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-document-field-edit',
  templateUrl: './document-field-edit.component.html',
  styleUrls: ['./document-field-edit.component.css']
})
export class DocumentFieldEditComponent implements OnInit, AfterViewInit {

  @Input() fieldGroup: FormGroup;
  @Input() field: Field;

  @Output() deleteField = new EventEmitter<void>();

  selectedDictionaryValues: DictionaryValue[];
  dictionaries: Dictionary[];
  users: string[];

  readonly fieldTypes = Object.values(FieldTypeEnum);

  constructor(private dictionariesService: DictionariesService,
    private validationService: ValidationService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.dictionaries = this.dictionariesService.getDictionaries();
    this.users = this.userService.getUsers();
    this.initForm();
    this.onDictionaryChange(this.field?.dictionaryId);
  }

  ngAfterViewInit(): void {
    this.setValidators();
  }

  private setValidators() {
    const fieldType = this.fieldGroup.get('type').value;
    const defaultValueControl = this.fieldGroup.get('defaultValue');

    defaultValueControl.clearValidators();
    defaultValueControl.setValidators(this.validationService.getValidator(fieldType as FieldTypeEnum));
    defaultValueControl.updateValueAndValidity();

    const dictionaryIdValidators = this.isDictionary() ? Validators.required : [];
    const dictionaryIdControl = this.fieldGroup.get('dictionaryId');

    dictionaryIdControl.clearValidators();
    dictionaryIdControl.setValidators(dictionaryIdValidators);
    dictionaryIdControl.updateValueAndValidity();
  }

  initForm() {
    this.fieldGroup.addControl('id', new FormControl(this.field?.id));
    this.fieldGroup.addControl('name', new FormControl(this.field?.name, Validators.required));
    this.fieldGroup.addControl('type', new FormControl(this.field?.type || this.fieldTypes[0], Validators.required));
    this.fieldGroup.addControl('required', new FormControl(this.field?.required));
    this.fieldGroup.addControl('dictionaryId', new FormControl(this.field?.dictionaryId));
    this.fieldGroup.addControl('defaultValue', new FormControl(this.field?.defaultValue));
  }

  onTypeChange() {
    this.fieldGroup.patchValue({
      defaultValue: null,
      dictionaryId: this.isDictionary() ? this.dictionaries[0].id : null
    });
    this.selectedDictionaryValues = [];
    this.setValidators();
  }

  private isDictionary() {
    const fieldType = this.fieldGroup.get('type').value;
    return fieldType === FieldTypeEnum.DICTIONARY;
  }

  onDictionaryChange(value: number) {
    const dictionary = this.dictionariesService.getDictionary(+value);
    this.selectedDictionaryValues = dictionary?.dictionaryValues || [];
  }

  onDeleteField() {
    this.deleteField.emit();
  }

  onDateRangeChange(dates: moment.Moment[]) {
    if (dates.length > 2) {
      this.fieldGroup.patchValue({
        defaultValue: dates[2].format(AppSettings.DATE_FORMAT)
      });
    }
  }

}
