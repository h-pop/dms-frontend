import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { OauthComponent } from './oauth/oauth.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'login' },
    // { path: '**', redirectTo: 'login' },
    { path: 'login', component: LoginComponent },
    { path: 'oauthcallback', component: OauthComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
