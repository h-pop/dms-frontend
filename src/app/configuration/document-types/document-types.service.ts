import { DocumentType } from './document-type.model';
import { EventEmitter } from '@angular/core';

export class DocumentTypesService {
    
    documentTypesChanged = new EventEmitter<DocumentType[]>();
    documentTypes: DocumentType[] = [
        new DocumentType(1, 'VAT Invoice', ['Description', 'Company 1', 'Company 2', 'Net value']),
        new DocumentType(2, 'Leave request', ['From', 'to', 'Net value', 'Description', 'Accepting user'])
    ];

    getDocumentTypes() : DocumentType[] {
        return this.documentTypes.slice();
    }
    
    deleteDocumentType(index: number) {
        this.documentTypes.splice(index, 1);
        this.documentTypesChanged.emit(this.getDocumentTypes());
    }
}