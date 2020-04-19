import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NewDocumentComponent } from './new-document/new-document.component';
import { DocumentRepositoryComponent } from './document-repository/document-repository.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { DocumentTypesComponent } from './configuration/document-types/document-types.component';
import { OrganizationStructureComponent } from './configuration/organization-structure/organization-structure.component';
import { DocumentTypeEditComponent } from './configuration/document-types/document-type-edit/document-type-edit.component';
import { DictionariesComponent } from './configuration/dictionaries/dictionaries.component';
import { DictionaryEditComponent } from './configuration/dictionaries/dictionary-edit/dictionary-edit.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    { path: 'home', component: HomeComponent },
    { path: 'new-document', component: NewDocumentComponent },
    { path: 'document-repository', component: DocumentRepositoryComponent },
    { path: 'configuration', component: ConfigurationComponent, children: [
        { path: 'document-types', component: DocumentTypesComponent },
        { path: 'document-types/new', component: DocumentTypeEditComponent },
        { path: 'document-types/:id', component: DocumentTypeEditComponent },
        { path: 'org-structure', component: OrganizationStructureComponent },
        { path: 'dictionaries', component: DictionariesComponent },
        { path: 'dictionaries/new', component: DictionaryEditComponent },
        { path: 'dictionaries/:id', component: DictionaryEditComponent }
    ]},
    { path: 'login', component: LoginComponent }, 
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
