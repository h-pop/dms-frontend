import { Dictionary } from "./dictionary.model";
import { Subject } from 'rxjs';
import { IdGenerator } from 'src/app/shared/id-generator.service';
import { Injectable } from '@angular/core';

@Injectable()
export class DictionariesService {
  dictionariesChanged = new Subject<Dictionary[]>();
  dictionaries: Dictionary[] = [
    new Dictionary(1, "Status", [
      "New",
      "Pending approval",
      "Approved",
      "Correction needed",
    ]),
    new Dictionary(2, "Office address", [
      "Wiejska 1/20, Warsaw",
      "St. Martin Street 2/12, Posen",
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
