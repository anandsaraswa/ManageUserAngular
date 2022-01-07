import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Users } from '../models/users.model';
import { Crud } from '../models/crud.model';
import { User } from '../models/user.model';
import { Address } from '../models/address.model';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PostService {

   url = "http://localhost:8081"
 // url = "https://returnbharo.herokuapp.com"

  constructor(private http: HttpClient) {}

  createAndAddUser(postData: Users,file: File ) {
    let formdata: FormData = new FormData();

    const userBlob = new Blob([JSON.stringify(postData)],{ type: "application/json"});

    formdata.append('file', file);
    formdata.append('users', userBlob);
  
    return this.http.post<Crud>('/api/user', formdata);
  }

  createAddress(postData: Address) {
    return this.http.post<Crud>('/api/address', postData);
  }

  updateAddress(postData: Address) {
    return this.http.put<Crud>('/api/address', postData);
  }

  updateUser(postData: Users) {
    return this.http.put<Crud>('/api/user', postData);
  }

  fetchUsers() {
    return this.http.get<Users[]>('/api/users');
  }

  fetchUser(userId: number) {
    return this.http.get<Users>('/api/user/' + userId).pipe(map(responseData => {
      var image = this.url +"/api/image/"+ responseData.image
      if(responseData.image == '' || responseData.image == null){
          image = "assets/img/noimage.png"
      }
      const user: Users = responseData;
      user.image = image;
      return user;
  }));
  }

  fetchAddressOfUser(userId: number) {
    return this.http.get<Address[]>('/api/user/address/' + userId);
  }

  validateLoginUser(user: User) {
    return this.http.post<Crud>('/api/authenticate', user);
  }

  deleteUser(id: number) {
    return this.http.delete<Crud>('/api/user/' + id);
  }

  deleteAddress(id: number) {
    return this.http.delete<Crud>('/api/user/delete/address/' + id);
  }
}
