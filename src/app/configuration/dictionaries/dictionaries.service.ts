import { Dictionary } from "./dictionary.model";
import { EventEmitter } from "@angular/core";

export class DictionariesService {
  dictionariesChanged = new EventEmitter<Dictionary[]>();
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

  getDictionaries(): Dictionary[] {
    return this.dictionaries;
  }

  getDictionary(dictionaryId: any): Dictionary {
    for (const dictionary of this.dictionaries) {
      if (dictionary.id === dictionaryId) {
        return JSON.parse(JSON.stringify(dictionary));
      }
    }
  }
  updateDictionary(dictionary: Dictionary) {
    this.dictionaries = this.dictionaries.filter(
      (dict: Dictionary) => {
        return dict.id !== dictionary.id;
      }
    );
    this.dictionaries.push(dictionary);
    this.dictionariesChanged.emit(this.getDictionaries());
  }

  deleteDictionary(index: number) {
    this.dictionaries.splice(index, 1);
    this.dictionariesChanged.emit(this.getDictionaries());
  }
}
