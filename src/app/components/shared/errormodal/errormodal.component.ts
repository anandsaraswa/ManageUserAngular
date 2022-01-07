import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscriber, Subscription } from 'rxjs';
import { CommunicationService } from 'src/app/service/communication.service';

@Component({
  selector: 'app-errormodal',
  templateUrl: './errormodal.component.html',
  styleUrls: ['./errormodal.component.css']
})
export class ErrormodalComponent implements OnInit, OnDestroy {

  show:boolean = true;

  message:string;


  subscription?: Subscription;

  constructor(private common:CommunicationService) { }
  

  ngOnInit(): void {
    this.subscription = this.common.error.subscribe((message) => {
      this.show = false;
      this.message = message;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe
  }

}
