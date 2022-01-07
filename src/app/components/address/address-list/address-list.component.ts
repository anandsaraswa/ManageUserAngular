import { Component, OnInit, Output,EventEmitter, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Address } from 'src/app/models/address.model';
import { CommunicationService } from 'src/app/service/communication.service';
import { PostService } from 'src/app/service/postservice.service';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.css']
})
export class AddressListComponent implements OnInit, OnDestroy {

  public addresses:Address[];
  subscriptionPath: Subscription;
  public userId:number;
  public index:number;
  @Input() userSame:boolean
  subscription?: Subscription;
  constructor( private postsService:PostService,private activatedRoute: ActivatedRoute,private commService:CommunicationService) { }
  ngOnInit(): void {
    console.log(this.userSame)

    this.subscriptionPath =   this.activatedRoute.params.subscribe(pathParam => {
      this.fetchAddressOfUser(pathParam.id)
    });

    this.subscription =  this.commService.address
    .subscribe(
      (addressObj:any) =>{
       
        if(addressObj.actionType == 'Update') {
          this.addresses[this.index] = addressObj.address
        }
        if(addressObj.actionType == 'Add') {
          this.addresses.push(addressObj.address)
        }
      }
    );
  }

  fetchAddressOfUser(userId:number){
    this.userId = userId;
    this.postsService.fetchAddressOfUser(userId).subscribe(posts => {
      this.addresses = []
      this.addresses =  posts;
    }) 
  }
   
  deleteAddress(id:number){
    this.postsService.deleteAddress(id).subscribe(posts => {
      this.fetchAddressOfUser(this.userId)
    })
  }

  editAddress(index: number) {
    this.index = index;
    this.commService.addressEdit.emit({
      actionType: "Update",
      address: this.addresses[this.index]
    })
  }

  openPopup() {
    this.commService.addressEdit.emit({
      actionType: "Add",
      address: this.addresses[this.index]
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
    this.subscriptionPath.unsubscribe
  }

}
