import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
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
        DictionaryEditComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule
    ],
    providers: [LoginService, DocumentTypesService, DictionariesService],
    bootstrap: [AppComponent]
})
export class AppModule { }
