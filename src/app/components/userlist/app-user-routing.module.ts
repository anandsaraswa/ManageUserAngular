
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/auth/auth-guard.service';
import { UserlistComponent } from './userlist.component';
const routes: Routes = [
  {
    path: '',
    component: UserlistComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes),CommonModule,FormsModule],
  exports: [RouterModule,CommonModule,FormsModule]
})
export class UserRoutingModule {}
