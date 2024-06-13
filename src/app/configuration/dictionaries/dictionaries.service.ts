import { Dictionary } from './dictionary.model';
import { Observable, ReplaySubject } from 'rxjs';
import { IdGenerator } from 'src/app/shared/id-generator.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DictionariesService {
  dictionariesChanged = new ReplaySubject<Dictionary[]>(1);
  dictionaries: Dictionary[];

  static readonly URL = 'http://localhost:8080/dictionary/';

  constructor(private httpClient: HttpClient) { }

  getDictionaries(): void {
    this.httpClient.get(DictionariesService.URL).subscribe((result: Dictionary[]) => {
      this.dictionaries = result
      this.dictionariesChanged.next(this.dictionaries);
    });;
  }

  getDictionary(dictionaryId: any): Observable<any> {
    return this.httpClient.get(`${DictionariesService.URL}${dictionaryId}`);
  }

  updateDictionary(dictionary: Dictionary): Observable<any> {
    return dictionary.id
      ? this.httpClient.put(DictionariesService.URL, dictionary)
      : this.httpClient.post(DictionariesService.URL, dictionary);
  }

  deleteDictionary(index: number) {
    this.httpClient.delete(`${DictionariesService.URL}${index}`).subscribe(r => {
      this.dictionaries = this.dictionaries.filter(d => d.id !== index);
      this.dictionariesChanged.next(this.dictionaries);
    });
  }
}
