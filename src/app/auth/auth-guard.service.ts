import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {
  constructor( public router: Router) {}
  canActivate() {  
    if (localStorage.getItem('jwt')) {  
        return true;  
    }  
    this.router.navigate(['login']);  
    return false;  
}  
}