import { Dictionary, DictionaryValue } from './dictionary.model';
import { Subject } from 'rxjs';
import { IdGenerator } from 'src/app/shared/id-generator.service';
import { Injectable } from '@angular/core';

@Injectable()
export class DictionariesService {
  dictionariesChanged = new Subject<Dictionary[]>();
  dictionaries: Dictionary[] = [
    new Dictionary(1, 'Status', [
      new DictionaryValue(1, 'New', 1),
      new DictionaryValue(1, 'Pending approval', 2),
      new DictionaryValue(1, 'Approved', 3),
      new DictionaryValue(1, 'Correction needed', 4)
    ]),
    new Dictionary(2, 'Office address', [
      new DictionaryValue(2, 'Wiejska 1/20, Warsaw', 5),
      new DictionaryValue(2, 'St. Martin Street 2/12, Posen', 6),
    ]),
  ];

  constructor(private idGenerator: IdGenerator) { }

  getDictionaries(): Dictionary[] {
    return this.dictionaries.slice();
  }

  getDictionary(dictionaryId: any): Dictionary {
    return this.dictionaries.find((value) => value.id === dictionaryId);
  }

  updateDictionary(dictionary: Dictionary) {
    if (dictionary.id != null) {
      return;
    }
    dictionary.id = this.idGenerator.next();
    this.dictionaries.push(dictionary);
    this.dictionariesChanged.next(this.getDictionaries());
  }

  deleteDictionary(index: number) {
    this.dictionaries.splice(index, 1);
    this.dictionariesChanged.next(this.getDictionaries());
  }
}
