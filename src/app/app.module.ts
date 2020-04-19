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
import { ConfigureComponent } from './configure/configure.component';
import { DropdownDirective } from './shared/dropdown.directive';

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
        ConfigureComponent,
        DropdownDirective
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule
    ],
    providers: [LoginService],
    bootstrap: [AppComponent]
})
export class AppModule { }
