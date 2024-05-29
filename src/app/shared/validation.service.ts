import { Injectable } from '@angular/core';
import { ValidatorFn, FormControl, Validators } from '@angular/forms';
import { FieldTypeEnum } from './field-type.enum';
import moment from 'moment';
import { AppSettings } from './app.settings';

@Injectable()
export class ValidationService {

  getValidator(fieldTypeEnum: FieldTypeEnum): ValidatorFn | ValidatorFn[] {
    switch (fieldTypeEnum) {
      case FieldTypeEnum.TEXT:
        return this.textValidator;
      case FieldTypeEnum.TEXTAREA:
        return this.textareaValidator;
      case FieldTypeEnum.DATE:
        return this.dateValidator;
      case FieldTypeEnum.DATERANGE:
        return this.daterangeValidator;
      case FieldTypeEnum.NUMBER:
        return this.numberValidator;
      case FieldTypeEnum.USER:
        return this.dictionaryValidator;
      case FieldTypeEnum.DICTIONARY:
        return this.userValidator;
      default:
        break;
    }
    console.log('field type: ' + fieldTypeEnum);
    return null;
  }

  textValidator(control: FormControl): { [s: string]: boolean } {
    if (control.value && control.value.length > 50) {
      return { 'valueTooLong': true };
    }
    return null;
  }

  textareaValidator(control: FormControl): { [s: string]: boolean } {
    if (control.value && control.value.length > 200) {
      return { 'valueTooLong': true };
    }
    return null;
  }

  daterangeValidator(control: FormControl): { [s: string]: boolean } {
    if (control.value) {
      const dates = control.value.split('|');
      if (dates.length !== 2) {
        return { 'twoDatesNeeded': true }
      }
      const dateFromParsed = moment(dates[0], AppSettings.DATE_FORMAT);
      const dateToParsed = moment(dates[1], AppSettings.DATE_FORMAT);
      if (dateFromParsed.isAfter(dateToParsed)) {
        return { 'dateFromAfterDateTo': true }
      }
    }
    return null;
  }

  numberValidator = Validators.pattern(/^[1-9]+[\.,]*[0-9]*$/);

  dateValidator(control: FormControl): { [s: string]: boolean } {
    // Not needed atm
    return null;
  }

  dictionaryValidator(control: FormControl): { [s: string]: boolean } {
    // Not needed atm
    return null;
  }

  userValidator(control: FormControl): { [s: string]: boolean } {
    // Not needed atm
    return null;
  }

}