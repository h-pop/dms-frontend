import { DocumentType, Field } from './document-type.model';
import { EventEmitter, Injectable } from '@angular/core';
import { IdGenerator } from 'src/app/shared/id-generator.service';

@Injectable()
export class DocumentTypesService {
  documentTypesChanged = new EventEmitter<DocumentType[]>();
  documentTypes: DocumentType[] = [
    new DocumentType(1, 'VAT Invoice', [
      new Field('Description', 'textarea', 'Default description', 1, null, true),
      new Field('Company 1', 'text', 'Some company', 2),
      new Field('Status', 'dictionary', '2', 3, 1, true),
      new Field('Net value', 'number', null, 4),
      new Field('Accepting user', 'user', null, 9),
      new Field('Some daterange', 'daterange', null, 11),
      new Field('Some date', 'date', null, 12)
    ]),
    new DocumentType(2, 'Leave request', [
      new Field('From', 'date', '', 5),
      new Field('to', 'date', '', 6),
      new Field('Description', 'text', '', 7),
      new Field('Company 1', 'text', '', 8),
      new Field('Net value', 'text', '', 10)
    ]),
  ];

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

  updateDocumentType(documentType: DocumentType) {
    if (documentType.id != null) {
      return;
    }
    documentType.id = this.idGenerator.next();
    this.documentTypes.push(documentType);
    this.documentTypesChanged.emit(this.getDocumentTypes());
  }
}
