export class DocumentType {

  id: number;
  name: string;
  fields: Field[];

  constructor(id?: number, name?: string, fields?: Field[]) {
    this.id = id;
    this.name = name;
    this.fields = fields || [];
  }
}

export class Field {

  id: number;
  name: string;
  type: string;
  defaultValue: string;

  constructor(name?: string, type?: string, defaultValue?: string, id?: number) {
    this.name = name;
    this.type = type;
    this.defaultValue = defaultValue;
    this.id = id || Math.floor(Math.random() * 100000) + 10;
  }
}
