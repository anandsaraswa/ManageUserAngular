import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CommunicationService } from '../service/communication.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private router: Router,
    private commservice: CommunicationService
  ) {}

  public login(response: any) {
    if (response.jwt != null) {
      localStorage.setItem('jwt', response.jwt);
      localStorage.setItem('name', response.users.firstName +" "+response.users.lastName);
      localStorage.setItem('role', response.users.role);
      localStorage.setItem('username', response.users.email);
      this.commservice.loggedInStatus.emit(true);
      this.router.navigate(['landing']);
    }
  }

  public logout() {
    this.commservice.loggedInStatus.emit(false);
    localStorage.removeItem('jwt');
    localStorage.removeItem('name');
    localStorage.removeItem('role');
    this.router.navigate(['login']);
  }

  public get loggedIn(): boolean {
    return localStorage.getItem('jwt') !== null;
  }
  public get getName(): string {
    return localStorage.getItem('name');
  }
  public get getRole(): string {
    return localStorage.getItem('role');
  }
  public get getjwt(): string {
    return localStorage.getItem('jwt');
  }

  public get getUsername(): string {
    return localStorage.getItem('username');
  }
}
