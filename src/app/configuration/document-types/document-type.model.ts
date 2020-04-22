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
  defaultValueParent: string;
  defaultValue: string;

  constructor(name?: string, type?: string, defaultValue?: string, id?: number, defaultValueParent?: string) {
    this.name = name;
    this.type = type;
    this.defaultValue = defaultValue;
    this.defaultValueParent = defaultValueParent;
    this.id = id;
  }
}
