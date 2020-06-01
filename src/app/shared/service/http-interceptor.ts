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
    private accountService: AccountService
    ){}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {

      let token = this.accountService.getAuthorizationToken();
      let authReq: HttpRequest<any> = req;

      if(this.accountService.isLoggedIn()){

        authReq = req.clone({
          headers: req.headers.set('Authorization', 'Bearer ' + token)
        });

        //JSON.stringify(authReq.headers.get('Authorization'));
      }
     
      return next.handle(authReq)
        .pipe(
          catchError(this.handleError)
      );
  }
  private handleError(error: HttpErrorResponse){
      if(error.error instanceof ErrorEvent){
        console.error('Ocorreu um erro: ' + error.error.message);
      }else{
        console.error(
          `Código do erro ${error.status}, ` + 
          `Erro: ${JSON.stringify(error.error)}`
        );
      }
      return throwError('Ocorreu um erro, tente novamente.')
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