import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdduserComponent } from '../shared/adduser/adduser.component';
import { UserlistComponent } from './userlist.component';
import { UserRoutingModule } from './app-user-routing.module';


@NgModule({
  declarations: [
    AdduserComponent,
    UserlistComponent
  ],
  imports: [
    RouterModule,
    UserRoutingModule
    
  ]
})
export class UserModule {}
