import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DictionariesService } from '../dictionaries.service';
import { Dictionary, DictionaryValue } from '../dictionary.model';
import { FormGroup, Validators, FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-dictionary-edit',
  templateUrl: './dictionary-edit.component.html',
  styleUrls: ['./dictionary-edit.component.css'],
})
export class DictionaryEditComponent implements OnInit {

  mainFormGroup: FormGroup;

  private dictionary: Dictionary;

  constructor(
    private route: ActivatedRoute,
    private dictionariesService: DictionariesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fetchDictionary();
  }

  private fetchDictionary() {
    const dictionaryId = +this.route.snapshot.params.id;
    if (dictionaryId) {
      this.dictionariesService.getDictionary(dictionaryId).subscribe(result => {
        this.dictionary = result;
        this.initializeMainFormGroup();
      });
    } else {
      this.initializeMainFormGroup();
    }
  }

  private initializeMainFormGroup() {
    this.mainFormGroup = new FormGroup({
      id: new FormControl(this.dictionary?.id),
      name: new FormControl(this.dictionary?.name, Validators.required),
      dictionaryValues: new FormArray([], [this.hasAtLeastOneValue, this.hasUniqueName])
    });
    this.dictionary?.dictionaryValues.forEach(element => {
      this.onAddDictionaryValue(element);
    });
  }

  private getDictionaryValuesFormArray(): FormArray {
    return (this.mainFormGroup.get('dictionaryValues') as FormArray);
  }

  hasAtLeastOneValue(formArray: FormArray): { [s: string]: boolean } {
    if (formArray.value.length === 0) {
      return { 'noDictionaryValues': true };
    }
    return null;
  }

  hasUniqueName(formArray: FormArray): { [s: string]: boolean } {
    let result;
    formArray.value.reduce((a, b) => {
      if (a.indexOf(b.value) > -1) {
        result = { 'duplicateDictionaryValues': true };
      }
      a.push(b.value);
      return a;
    }, [])
    return result;
  }

  onAddDictionaryValue(element?: DictionaryValue) {
    const control = new FormGroup({
      id: new FormControl(element?.id),
      dictionaryId: new FormControl(element?.dictionaryId || this.dictionary?.id),
      value: new FormControl(element?.value, Validators.required)
    });
    this.getDictionaryValuesFormArray().push(control);
  }

  getDictionaryValueControls() {
    return this.getDictionaryValuesFormArray().controls;
  }

  onDeleteDictionaryValue(index: number) {
    this.getDictionaryValuesFormArray().removeAt(index);
  }

  noDictionaryValues() {
    return this.checkIfErrorOccured('noDictionaryValues');
  }

  duplicateDictionaryValues() {
    return this.checkIfErrorOccured('duplicateDictionaryValues');
  }

  checkIfErrorOccured(errorId: string) {
    if (this.mainFormGroup.valid) {
      return false;
    }
    const dictionaryValueControl = this.mainFormGroup.get('dictionaryValues');
    return dictionaryValueControl.touched
      && dictionaryValueControl.errors
      && dictionaryValueControl.errors[errorId];
  }

  onSubmit() {
    // TODO additional validation?
    this.dictionariesService.updateDictionary(this.mainFormGroup.value).subscribe(r => {
      this.router.navigate(['..'], { relativeTo: this.route });
    });
  }

}
