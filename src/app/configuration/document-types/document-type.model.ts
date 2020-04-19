export class DocumentType {
    id: number;
    name: string;
    fields: string[];

    constructor(id: number, name: string, fields: string[]) {
        this.id = id;
        this.name = name;
        this.fields = fields;
    }
}