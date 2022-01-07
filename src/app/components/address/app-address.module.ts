import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AddressListComponent } from './address-list/address-list.component';
import { AddAddressComponent } from './add-address/add-address.component';
import { UserDetailComponent } from '../user-detail/user-detail.component';
import { AddressRoutingModule } from './app-address-routing.module';


@NgModule({
  declarations: [
    AddressListComponent,
    AddAddressComponent,
    UserDetailComponent
  ],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    AddressRoutingModule
  ]
})
export class AddressModule {}
