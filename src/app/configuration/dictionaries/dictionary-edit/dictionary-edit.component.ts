import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DictionariesService } from '../dictionaries.service';
import { Dictionary } from '../dictionary.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-dictionary-edit',
  templateUrl: './dictionary-edit.component.html',
  styleUrls: ['./dictionary-edit.component.css'],
})
export class DictionaryEditComponent implements OnInit {

  // TODO Switch to reactive approach - in this case template driven approach sucks

  @ViewChild('f') dictionaryEditForm: NgForm;
  dictionary: Dictionary;
  dictionaryValues: string[];

  constructor(
    private route: ActivatedRoute,
    private dictionariesService: DictionariesService
  ) { }

  ngOnInit(): void {
    this.fetchDictionary();
  }

  fetchDictionary() {
    const dictionaryId = +this.route.snapshot.params['id'];
    this.dictionary = this.dictionariesService.getDictionary(dictionaryId);
    this.dictionaryValues = this.dictionary.values.slice();
    if (this.dictionary == null) {
      this.dictionary = new Dictionary();
      this.onAddDictionaryValue();
    }
  }

  onAddDictionaryValue() {
    this.dictionaryValues.push('');
  }

  onDeleteDictionaryValue(index: number) {
    this.dictionaryValues.splice(index, 1);
  }

  onSubmit() {
    this.dictionary.name = this.dictionaryEditForm.value.dictionaryName;
    this.dictionary.values = [];

    const dictionaryValueGroup = this.dictionaryEditForm.value.dictionaryValueGroup;
    let counter = 1;
    while (dictionaryValueGroup[counter]) {
      this.dictionary.values.push(dictionaryValueGroup[counter++]);
    }
    this.dictionariesService.updateDictionary(this.dictionary);
  }

}
