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
import { DocumentFieldEditComponent } from './configuration/document-types/document-type-edit/document-field-edit/document-field-edit.component';
import { IdGenerator } from './shared/id-generator.service';
import { DpDatePickerModule } from 'ng2-date-picker';
import { DocumentFieldComponent } from './new-document/document-field/document-field.component';
import { ValidationService } from './shared/validation.service';
import { UserService } from './shared/user.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
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
    DocumentFieldEditComponent,
    DocumentFieldComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    PdfViewerModule,
    DpDatePickerModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDatepickerModule
  ],
  providers: [LoginService, DocumentTypesService, DictionariesService, IdGenerator, ValidationService, UserService, provideAnimationsAsync(), provideNativeDateAdapter()],
  bootstrap: [AppComponent]
})
export class AppModule { }
