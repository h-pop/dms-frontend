import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DictionariesService } from '../dictionaries.service';
import { Dictionary } from '../dictionary.model';
import { NgForm, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';

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
    this.initializeMainFormGroup();
  }

  private fetchDictionary() {
    const dictionaryId = +this.route.snapshot.params.id;
    this.dictionary = this.dictionariesService.getDictionary(dictionaryId);
    if (this.dictionary == null) {
      this.dictionary = new Dictionary();
    }
  }

  private initializeMainFormGroup() {
    this.mainFormGroup = new FormGroup({
      dictionaryName: new FormControl(this.dictionary.name, Validators.required),
      dictionaryValues: new FormArray([], this.hasAtLeastOneValue)
    });
    this.dictionary.values.forEach(element => {
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

  onAddDictionaryValue(element: string) {
    const control = new FormControl(element || null, Validators.required);
    this.getDictionaryValuesFormArray().push(control);
  }

  getDictionaryValueControls() {
    return this.getDictionaryValuesFormArray().controls;
  }

  onDeleteDictionaryValue(index: number) {
    this.getDictionaryValuesFormArray().removeAt(index);
  }

  isDictionaryValueMissing(index: number) {
    if (this.mainFormGroup.valid) {
      return false;
    }
    const dictionaryValueControl = this.mainFormGroup.get('dictionaryValues.' + index);
    return dictionaryValueControl.touched
      && dictionaryValueControl.errors
      && dictionaryValueControl.errors['required'];
  }

  noDictionaryValues() {
    if (this.mainFormGroup.valid) {
      return false;
    }
    const dictionaryValues = this.mainFormGroup.get('dictionaryValues');
    return dictionaryValues.errors
      && dictionaryValues.errors['noDictionaryValues'];
  }

  onSubmit() {
    this.dictionary.name = this.mainFormGroup.value.dictionaryName;
    this.dictionary.values = this.mainFormGroup.value.dictionaryValues;
    this.dictionariesService.updateDictionary(this.dictionary);
    this.router.navigate(['..'], { relativeTo: this.route });
  }

}
