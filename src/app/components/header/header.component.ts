import { Component, OnInit, Output,EventEmitter, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { CommunicationService } from 'src/app/service/communication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
  
})
export class HeaderComponent implements OnInit,OnDestroy {

  public loggedIn:boolean;

  subscription?: Subscription;

  constructor(private authenticationService: AuthService,private commService:CommunicationService) { }

  ngOnInit(): void {
    this.loggedIn =  this.authenticationService.loggedIn;
    this.subscription =  this.commService.loggedInStatus
     .subscribe(
       (loggedIn:boolean) =>{
          this.loggedIn = loggedIn
       }
     );
  }

  logout() {  
    this.authenticationService.logout();  
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe
  }

}
