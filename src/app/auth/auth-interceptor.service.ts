import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CommunicationService } from '../service/communication.service';
import { SpinnerService } from '../service/spinner-service.service';
import { AuthService } from './auth.service';
@Injectable({ providedIn: 'root' })
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService, private spinnerService:SpinnerService, private common:CommunicationService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    if(req.url != "/api/authenticate") {
        const modifyRequest = req.clone({
            url: "http://localhost:8081"+req.url,
            headers: req.headers.append(
              'Authorization',
              'Bearer ' + this.authService.getjwt
            ),
          });
      
          return next
          .handle(modifyRequest)
          .pipe(
              tap((event: HttpEvent<any>) => {
                  if (event instanceof HttpResponse) {
                      this.spinnerService.requestEnded();
                  }
              }, (error) => {
                this.spinnerService.resetSpinner();
                  this.common.error.emit(error.error.message);
              })
          ); 
        }
     else {
        const modifyRequest  =  req.clone({
            url: "http://localhost:8081"+req.url
         }
            ) 

            return next
          .handle(modifyRequest)
          .pipe(
              tap((event: HttpEvent<any>) => {
                  if (event instanceof HttpResponse) {
                      this.spinnerService.requestEnded();
                  }
              }, (error) => {
                this.common.error.emit("All not well"+error);
                  this.spinnerService.resetSpinner();
              })
          ); 
    }
}
}
