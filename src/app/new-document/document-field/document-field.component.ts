import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Field } from 'src/app/configuration/document-types/document-type.model';
import { DictionariesService } from 'src/app/configuration/dictionaries/dictionaries.service';
import { DictionaryValue } from 'src/app/configuration/dictionaries/dictionary.model';
import * as moment from 'moment';
import { AppSettings } from 'src/app/shared/app.settings';

@Component({
  selector: 'app-document-field',
  templateUrl: './document-field.component.html',
  styleUrls: ['./document-field.component.css']
})
export class DocumentFieldComponent implements OnInit {

  @Input() documentFieldGroup: FormGroup;
  @Input() documentField: Field;

  selectedDictionaryValues: DictionaryValue[];
  // TODO validate daterange
  // datePickerConfig: IDatePickerConfig = { allowMultiSelect: true };
  // TODO get users from service
  users = ['User 1', 'User 2'];

  constructor(private dictionariesService: DictionariesService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initializeDocumentFieldGroup();
    if (this.documentField?.type === 'dictionary' && this.documentField?.defaultValueParent) {
      this.selectedDictionaryValues = this.dictionariesService.getDictionary(+this.documentField.defaultValueParent).dictionaryValues;
    }
  }

  onCustomDateChange(dates: moment.Moment[]) {
    if (dates.length > 2) {
      this.documentFieldGroup.patchValue({
        fieldValue: dates[2].format(AppSettings.DATE_FORMAT)
      });
    }
    // TODO validate daterange
    // else if (dates.length > 0) {
    //   this.datePickerConfig.min = dates[0];
    // }
    // else if (dates.length === 2) {
    //   this.documentFieldGroup.patchValue({
    //     fieldValue: dates[0].format("DD-MM-YYYY") + ' - ' + dates[1].format("DD-MM-YYYY")
    //   });
    // }
  }

  private initializeDocumentFieldGroup() {
    const validators = this.documentField.required ? [Validators.required] : [];
    this.documentFieldGroup.addControl('fieldValue', this.formBuilder.control(this.documentField?.defaultValue, validators));
  }
}
