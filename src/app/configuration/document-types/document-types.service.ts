import { DocumentType, Field } from "./document-type.model";
import { EventEmitter } from "@angular/core";

export class DocumentTypesService {
  documentTypesChanged = new EventEmitter<DocumentType[]>();
  documentTypes: DocumentType[] = [
    new DocumentType(1, "VAT Invoice", [
      new Field("Description", 'text', ''),
      new Field("Company 1", 'text', ''),
      new Field("Company 2", 'text', ''),
      new Field("Net value", 'text', '')
    ]),
    new DocumentType(2, "Leave request", [
      new Field("From", 'text', ''),
      new Field("to", 'text', ''),
      new Field("Description", 'text', ''),
      new Field("Company 1", 'text', ''),
      new Field("Accepting user", 'text', ''),
      new Field("Net value", 'text', '')
    ]),
  ];
  fieldTypes = ['text', 'textarea', 'number', 'dictionary', 'date', 'daterange', 'user'];

  getDocumentTypes(): DocumentType[] {
    return this.documentTypes.slice();
  }

  deleteDocumentType(index: number) {
    this.documentTypes.splice(index, 1);
    this.documentTypesChanged.emit(this.getDocumentTypes());
  }

  getDocumentType(documentTypeId: number): DocumentType {
    for (let documentType of this.documentTypes) {
      if (documentType.id === documentTypeId) {
        return documentType;
      }
    }
  }

  getFieldTypes(): string[] {
    return this.fieldTypes;
  }
}
