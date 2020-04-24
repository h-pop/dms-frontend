import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from './login/login.service';
import { OauthComponent } from './oauth/oauth.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { NewDocumentComponent } from './new-document/new-document.component';
import { DocumentRepositoryComponent } from './document-repository/document-repository.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { ConfigurationComponent } from './configuration/configuration.component';
import { ConfigurationListComponent } from './configuration/configuration-list/configuration-list.component';
import { DocumentTypesComponent } from './configuration/document-types/document-types.component';
import { OrganizationStructureComponent } from './configuration/organization-structure/organization-structure.component';
import { DocumentTypeEditComponent } from './configuration/document-types/document-type-edit/document-type-edit.component';
import { DocumentTypesService } from './configuration/document-types/document-types.service';
import { DictionariesComponent } from './configuration/dictionaries/dictionaries.component';
import { DictionariesService } from './configuration/dictionaries/dictionaries.service';
import { DictionaryEditComponent } from './configuration/dictionaries/dictionary-edit/dictionary-edit.component';
import { FieldEditComponent } from './configuration/document-types/document-type-edit/field-edit/field-edit.component';
import { IdGenerator } from './shared/id-generator.service';
import { DpDatePickerModule } from 'ng2-date-picker';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        OauthComponent,
        PageNotFoundComponent,
        HomeComponent,
        HeaderComponent,
        NewDocumentComponent,
        DocumentRepositoryComponent,
        ConfigurationComponent,
        DropdownDirective,
        ConfigurationListComponent,
        DocumentTypesComponent,
        OrganizationStructureComponent,
        DocumentTypeEditComponent,
        DictionariesComponent,
        DictionaryEditComponent,
        FieldEditComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        PdfViewerModule,
        DpDatePickerModule
    ],
    providers: [LoginService, DocumentTypesService, DictionariesService, IdGenerator],
    bootstrap: [AppComponent]
})
export class AppModule { }
