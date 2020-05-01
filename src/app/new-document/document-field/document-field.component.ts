import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Field } from 'src/app/configuration/document-types/document-type.model';
import { DictionariesService } from 'src/app/configuration/dictionaries/dictionaries.service';
import { DictionaryValue } from 'src/app/configuration/dictionaries/dictionary.model';
import * as moment from 'moment';
import { AppSettings } from 'src/app/shared/app.settings';
import { FieldTypeEnum } from 'src/app/shared/field-type.enum';
import { ValidationService } from 'src/app/shared/validation.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-document-field',
  templateUrl: './document-field.component.html',
  styleUrls: ['./document-field.component.css']
})
export class DocumentFieldComponent implements OnInit {

  @Input() documentFieldGroup: FormGroup;
  @Input() documentField: Field;

  selectedDictionaryValues: DictionaryValue[];
  users: string[];

  constructor(private dictionariesService: DictionariesService,
    private formBuilder: FormBuilder,
    private validationService: ValidationService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.users = this.userService.getUsers();
    this.initializeDocumentFieldGroup();
    if (this.documentField?.type === FieldTypeEnum.DICTIONARY && this.documentField?.dictionaryId) {
      this.selectedDictionaryValues = this.dictionariesService.getDictionary(+this.documentField.dictionaryId).dictionaryValues;
    }
  }

  onDateRangeChange(dates: moment.Moment[]) {
    if (dates.length > 2) {
      this.documentFieldGroup.patchValue({
        fieldValue: dates[2].format(AppSettings.DATE_FORMAT)
      });
    }
  }

  private initializeDocumentFieldGroup() {
    const validators = this.documentField.required ? [Validators.required] : [];
    const validatorFns = this.validationService.getValidator(this.documentField.type as FieldTypeEnum);
    this.documentFieldGroup.addControl('fieldValue', this.formBuilder.control(this.documentField?.defaultValue, validators.concat(validatorFns)));
  }
}
