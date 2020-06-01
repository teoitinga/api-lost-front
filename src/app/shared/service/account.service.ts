import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class AccountService {
  
  tokenIdentificator: string = 'token';

  constructor(
      private http: HttpClient,
      private router: Router
    ) { }
  
  public getAuthorizationToken(): string{
    if(this.isLoggedIn){
      const token = localStorage[this.tokenIdentificator];
      //const token = window.localStorage.getItem(this.tokenIdentificator);
      return token;
    }
    return '';
  }
  private isTokenExpired(token?: string): boolean{
      if(!token){
        return true;
      }
      const date = this.getTokenExporationDate(token);
      if(date === undefined){
        return false;
      }
      return !(date.valueOf() > new Date().valueOf());
  }
  public isLoggedIn(){
    const token = this.getAuthorizationToken();
    if(!token){
       return false;
    }else if(this.isTokenExpired(token)){
       return false;
    }
    return true;
  }
  public login(token: string){
    localStorage[this.tokenIdentificator] = token;
    this.router.navigate(['/clientes']);
  }
  public getActiveUserName():string{
    const decoded: any = jwt_decode(localStorage[this.tokenIdentificator]);

    if(decoded.nome === undefined){
      return null;
    }
    return decoded.nome;
  }
  public getActiveUserId():string{
    const decoded: any = jwt_decode(localStorage[this.tokenIdentificator]);

    if(decoded.login === undefined){
      return null;
    }
    return decoded.login;
  }

  public logout(){
    this.router.navigate(['login']);
    delete localStorage[this.tokenIdentificator];
  }
  private getTokenExporationDate(token: string):Date{
    const decoded: any = jwt_decode(token);
    if(decoded.exp === undefined){
      return null;
    }
    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }
}
