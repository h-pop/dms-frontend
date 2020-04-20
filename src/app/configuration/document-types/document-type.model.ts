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

  name: string;
  type: string;
  defaultValue: string;

  constructor(name?: string, type?: string, defaultValue?: string) {
    this.name = name;
    this.type = type || 'text';
    this.defaultValue = defaultValue;
  }
}
