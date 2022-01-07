import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Users } from 'src/app/models/users.model';
import { PostService } from 'src/app/service/postservice.service';
@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css'],
})
export class UserlistComponent implements OnInit {
  isLoading: boolean = true;
  showModel: boolean = true;
  index: number;
  actionType: string;

  users: Users[];

  updateUser: Users;
  constructor(public authService: AuthService, private router: Router, private postsService: PostService) {}

  ngOnInit(): void {
    this.fetchPostOnLoad();
  }

  fetchPostOnLoad() {
    this.isLoading = false;
    this.postsService.fetchUsers().subscribe((posts) => {
      this.users = [];
      this.isLoading = true;
      this.users = posts;
    });
  }

  openPopup() {
    this.showModel = false;
    this.actionType = 'Add';
  }

  hideEvent(newItem: boolean) {
    this.showModel = newItem;
  }

  addNewUser(newUser: any) {
    if (newUser.action == 'Add') {
      this.users.push(newUser.user);
    }
    if (newUser.action == 'Update') {
      this.users[this.index] = newUser.user;
    }
    this.hideEvent(true);
  }

  deleteUser(id: number) {
    this.isLoading = false;
    this.postsService.deleteUser(id).subscribe((posts) => {
      this.isLoading = true;
      this.fetchPostOnLoad();
    });
  }

  editUser(index: number) {
    this.index = index;
    this.updateUser = this.users[index];
    this.hideEvent(false);
    this.actionType = 'Update';
  }

  routeLink(id: number) {
    this.router.navigate(['address/' + id]);
  }
}
