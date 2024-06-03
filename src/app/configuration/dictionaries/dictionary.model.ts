export class Dictionary {
  id: number;
  name: string;
  dictionaryValues: DictionaryValue[];

  constructor(id?: number, name?: string, dictionaryValues?: DictionaryValue[]) {
    this.id = id;
    this.name = name;
    this.dictionaryValues = dictionaryValues || [];
  }
}

export class DictionaryValue {
  id: number;
  dictionaryId: number;
  value: string;

  constructor(dictionaryId: number, value?: string, id?: number) {
    this.id = id;
    this.dictionaryId = dictionaryId;
    this.value = value;
  }
}