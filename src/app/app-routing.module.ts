import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth-guard.service';
import { BodyComponent } from './components/body/body.component';
import { LoginComponent } from './components/login/login.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: BodyComponent,canActivate:[AuthGuard]  },
  { path: 'landing', component: BodyComponent,canActivate:[AuthGuard]  },
  {
    path: "address",
    loadChildren: () =>
      import("../app/components/address/app-address.module").then(
        m => m.AddressModule
      )
  },
  {
    path: "users",
    loadChildren: () =>
      import("../app/components/userlist/app-user.module").then(
        m => m.UserModule
      )
  }
];

@NgModule({
  declarations: [
    BodyComponent,
    LoginComponent
  ],
  imports: [RouterModule.forRoot(appRoutes),
    BrowserModule,FormsModule
],
  exports: [RouterModule,BrowserModule,FormsModule]
})
export class AppRoutingModule { }
