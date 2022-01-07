import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Users } from 'src/app/models/users.model';
import { PostService } from 'src/app/service/postservice.service';
@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit , OnDestroy{

  constructor(public authService:AuthService, private activatedRoute: ActivatedRoute,private postsService:PostService) { }
  subscriptionPath: Subscription;
  user?:Users;
  showAddressForm:boolean = true
  userId:number ;
  userSameOrNot:boolean

  ngOnInit(): void {
    this.subscriptionPath =   this.activatedRoute.params.subscribe(pathParam => {
      this.fetchUser(pathParam.id)
    });

   
  }

  fetchUser(userId:number){
    this.postsService.fetchUser(userId).subscribe(posts => {
      this.user = posts
      this.userId = userId;
      this.userSameOrNot = ((this.authService.getUsername == this.user.email) || this.authService.getRole == 'ROLE_ADMIN')
    }) 
  }

  ngOnDestroy(): void {
    this.subscriptionPath.unsubscribe();
  }
}
