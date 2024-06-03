import { Dictionary } from './dictionary.model';
import { Observable, Subject, tap } from 'rxjs';
import { IdGenerator } from 'src/app/shared/id-generator.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DictionariesService {
  dictionariesChanged = new Subject<Dictionary[]>();
  dictionaries: Dictionary[];

  static readonly URL = 'http://localhost:8080/dictionary/';

  constructor(
    private idGenerator: IdGenerator,
    private httpClient: HttpClient) { }

  getDictionaries(): void{
    this.httpClient.get(DictionariesService.URL).subscribe((result: Dictionary[]) => {
      this.dictionaries = result
      this.dictionariesChanged.next(this.dictionaries);
    });;
  }

  getDictionary(dictionaryId: any): Dictionary {
    return this.dictionaries.find((value) => value.id === dictionaryId);
  }
  
  getDictionary2(dictionaryId: any): Observable<any> {
    return this.httpClient.get(`${DictionariesService.URL}${dictionaryId}`);
  }

  updateDictionary(dictionary: Dictionary): Observable<any> {
    if (!dictionary.id) {
      dictionary.id = this.idGenerator.next();
    }
    return this.httpClient.post(DictionariesService.URL, dictionary);
  }
  
  deleteDictionary(index: number) {
    this.httpClient.delete(`${DictionariesService.URL}${index}`).subscribe(r => {
      this.dictionaries = this.dictionaries.filter(d => d.id !== index);
      this.dictionariesChanged.next(this.dictionaries);
    });
  }
}
