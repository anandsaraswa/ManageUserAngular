import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Address } from 'src/app/models/address.model';
import { CommunicationService } from 'src/app/service/communication.service';
import { PostService } from 'src/app/service/postservice.service';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.css'],
})
export class AddAddressComponent implements OnInit, OnDestroy {

  @Input() userId: number;
  addressObj: Subscription;
  addAddressForm: FormGroup;
  addressId: number;
  actionType: string ;
  public address: Address;
  show:boolean = true
  constructor(
    private postsService: PostService,
    private commService: CommunicationService
  ) {}

  ngOnInit(): void {
    this.addAddressForm = new FormGroup({
      address1: new FormControl(null, Validators.required),
      pincode: new FormControl(null, [Validators.required]),
      city: new FormControl(null, Validators.required),
      addressType: new FormControl(null, Validators.required),
    });

    this.addressObj = this.commService.addressEdit.subscribe(
      (event: any) => {
        this.actionType = event.actionType;
        this.show = false
        if(this.actionType == "Update") {
          this.addressId = event.address.id;
          this.addAddressForm.setValue({
            address1: event.address.address1,
            pincode: event.address.pincode,
            city: event.address.city,
            addressType: event.address.addressType,
          });
        }
        
      }
    );

  
  }

  closePopup() {
    this.addAddressForm.reset();
    this.show = true;
  }

  onSubmit(): void {
    this.address = new Address(
      this.addAddressForm.get('address1').value,
      this.addAddressForm.get('pincode').value,
      this.addAddressForm.get('addressType').value,
      this.addAddressForm.get('city').value
    );
    this.address.userId = this.userId;
    if (this.actionType == 'Add') {
      this.postsService
        .createAddress(this.address)
        .subscribe((responseData) => {
          if (responseData.status == 200) {
            this.address.id = responseData.id;

            this.commService.address.emit({
              address: this.address,
              actionType: this.actionType,
            });
            this.closePopup();
          }
        });
    }

    if (this.actionType == 'Update') {
      this.address.id = this.addressId;
      this.postsService
        .updateAddress(this.address)
        .subscribe((responseData) => {
          if (responseData.status == 200) {
            this.address.id = responseData.id;

            this.commService.address.emit({
              address: this.address,
              actionType: this.actionType,
            });
            this.closePopup();
          }
        });
    }
    this.addAddressForm.reset();
  }

  ngOnDestroy(): void {
    this.addressObj.unsubscribe();
  
  }
}
