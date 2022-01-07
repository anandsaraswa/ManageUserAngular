import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/models/user.model';
import { PostService } from 'src/app/service/postservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('loginF') loginForm: NgForm;
  isLoading: boolean = true;
  requestSent:boolean= true;
  constructor(private postsService: PostService, private authenticationService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(user: User): void {
    this.isLoading = false;
    this.postsService.validateLoginUser(user).subscribe(responseData => {
      this.isLoading = true;
      if (responseData.status == 200) {
          this.authenticationService.login(responseData);
      } else {
        this.requestSent =  false
      }
    })
    this.loginForm.reset();
  }

  hideAlert(){
    this.requestSent =  true
  }

}
