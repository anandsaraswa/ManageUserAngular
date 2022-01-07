import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Users } from 'src/app/models/users.model';
import { PostService } from 'src/app/service/postservice.service';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css'],
})
export class AdduserComponent implements OnInit, OnChanges {
  @Output() newItemEvent = new EventEmitter<boolean>();
  @Output() newUser = new EventEmitter<any>();
  @Input() userUpdate: Users;
  @Input() action: string;
  @ViewChild('addUserForm') userForm?: NgForm;
  file: File;
  imgURL: any;
  constructor(private postsService: PostService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.action == 'Add') {
      this.userForm?.reset();
    }

    if (this.action == 'Update') {
      this.userForm.setValue({
        firstName: this.userUpdate.firstName,
        lastName: this.userUpdate.lastName,
        email: this.userUpdate.email,
        password: this.userUpdate.password,
        confpassword: this.userUpdate.password,
        phoneNumber: this.userUpdate.phoneNumber,
      });
    }
  }


  loadNewUser(user: Users) {
    this.newUser.emit({
      action:this.action,
      user: user
    });
  }

  closePopup() {
    this.newItemEvent.emit(true);
  }

  onSubmit(user: Users): void {

    if(this.action == "Add") {
      user.role = 'ROLE_EMPLOYEE';
      this.postsService.createAndAddUser(user,this.file).subscribe((responseData) => {
        if (responseData.status == 200) {
          user.id = responseData.id;
          this.loadNewUser(user);
        }
      });
    }

    if(this.action == "Update") {
      user.role = 'ROLE_EMPLOYEE';
      user.id = this.userUpdate.id
    this.postsService.updateUser(user).subscribe((responseData) => {
      if (responseData.status == 200) {
        user.id = responseData.id;
        this.loadNewUser(user);
      }
    });
    }
  }

  onFileSelected(event: Event) {
    var reader = new FileReader();
    this.file = (<HTMLInputElement>event.target).files[0]
    reader.readAsDataURL(this.file);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }
}
