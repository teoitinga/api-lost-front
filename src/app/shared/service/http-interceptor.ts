import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable, NgModule } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators'; 
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AccountService } from './account.service';

@Injectable()
export class httpInterceptorService implements HttpInterceptor {
  constructor(
    private accountService: AccountService,
    private snack: MatSnackBar
    ){}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {

    let authReq: HttpRequest<any> = req;

    
    if(this.accountService.isLoggedIn()){
      const token = this.accountService.getAuthorizationToken();

        authReq = req.clone({
          headers: req.headers.set('Authorization', 'Bearer ' + token)
        });
      }
     
      return next.handle(authReq)
        .pipe(
          catchError(this.handleError)
      );
  }
  private handleError(error: HttpErrorResponse){

   return throwError(error);

  }
}

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: httpInterceptorService,
      multi: true,
    },
  ],
})
export class Interceptor { }