import { DocumentType, Field } from './document-type.model';
import { EventEmitter, Injectable } from '@angular/core';
import { IdGenerator } from 'src/app/shared/id-generator.service';

@Injectable()
export class DocumentTypesService {
  documentTypesChanged = new EventEmitter<DocumentType[]>();
  documentTypes: DocumentType[] = [
    new DocumentType(1, 'VAT Invoice', [
      new Field('Description', 'text', '', 1),
      new Field('Company 1', 'text', '', 2),
      new Field('Company 2', 'text', '', 3),
      new Field('Net value', 'text', '', 4)
    ]),
    new DocumentType(2, 'Leave request', [
      new Field('From', 'text', '', 5),
      new Field('to', 'text', '', 6),
      new Field('Description', 'text', '', 7),
      new Field('Company 1', 'text', '', 8),
      new Field('Accepting user', 'text', '', 9),
      new Field('Net value', 'text', '', 10)
    ]),
  ];
  fieldTypes = ['text', 'textarea', 'number', 'dictionary', 'date', 'daterange', 'user'];

  constructor(private idGenerator: IdGenerator) { }

  getDocumentTypes(): DocumentType[] {
    return this.documentTypes.slice();
  }

  deleteDocumentType(index: number) {
    this.documentTypes.splice(index, 1);
    this.documentTypesChanged.emit(this.getDocumentTypes());
  }

  getDocumentType(documentTypeId: number): DocumentType {
    return this.documentTypes.find((value) => value.id === documentTypeId);
  }

  getFieldTypes(): string[] {
    return this.fieldTypes;
  }

  updateDocumentType(documentType: DocumentType) {
    if (documentType.id != null) {
      return;
    }
    documentType.id = this.idGenerator.next();
    this.documentTypes.push(documentType);
    this.documentTypesChanged.emit(this.getDocumentTypes());
  }
}
