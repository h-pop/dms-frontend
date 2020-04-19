export class Dictionary {
    id: number;
    name: string;
    values: string[] = [];

    constructor(id?: number, name?: string, values?: string[]) {
        this.id = id || -1;
        this.name = name || '';
        this.values = values || [];
    }
}