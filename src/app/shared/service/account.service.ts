import { CabecalhoModel } from './../cabecalho.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginPost } from 'src/app/autenticacao';
import { environment as env } from './../../../environments/environment.prod';

@Injectable()
export class AccountService {
  
  private readonly PATH: string = 'auth';//url para login

  tokenIdentificator: string = 'token';

  private _headerData = new BehaviorSubject<CabecalhoModel>({
    title:'inicio',
    icon: 'home',
    routeUrl: '',
    user: ''
  });

  get headerData(): CabecalhoModel{
    return this._headerData.value;
  }
  set headerData(headerData: CabecalhoModel){
    this._headerData.next(headerData);
  }
  constructor(
      private http: HttpClient,
      private router: Router
    ) { }
  public showMessage(msg:string, title:string, isError: boolean=false, snack:MatSnackBar):void{
    snack.open(
      msg, title, {
        duration:3000,
        horizontalPosition: "right",
        verticalPosition:"top",
        panelClass: isError? ['msg-error']:['msg-success']
      }
    );
  }
  public getAuthorizationToken(): string{
    try {
      const token = localStorage[this.tokenIdentificator];

      if(typeof token === "undefined"){

        return '';
      }
      return token;
    } catch(error) {
      // invalid token format
      return '';
    }
    
  }
   public logar(login: LoginPost): Observable<any>{
        return this.http.post(env.baseApiUrl + this.PATH, login);
      }
  private isTokenExpired(token?: string): boolean{
    if(typeof token === "undefined"){
        return false;
      }
      const date = this.getTokenExporationDate(token);
      if(date === undefined){
        return false;
      }
      return !(date.valueOf() > new Date().valueOf());
  }
  public isLoggedIn(): boolean{

      const token = this.getAuthorizationToken();

      if(!token){

        return false;
      } else{
        if(this.isTokenExpired(token)){
          return false;
        }
        return true;
      }
  }
  public login(token: string){
    localStorage[this.tokenIdentificator] = token;
    this.router.navigate(['/clientes']);
  }

  public getActiveUserName():string{
    try {
      const token = this.getAuthorizationToken();

        if(typeof token === "undefined"){
        return '';
      }
      
      const decoded: any = jwt_decode(localStorage[this.tokenIdentificator]);
  
      if(decoded.nome === undefined){
        return '';
      }
      return decoded.nome;
    } catch(error) {
      // invalid token format
      return '';
    }

    
  }
  public getrRoleUser():string{
    if(typeof localStorage[this.tokenIdentificator] !== 'undefined'){
      return null;
    }
    const decoded: any = jwt_decode(localStorage[this.tokenIdentificator]);

    if(decoded.role === undefined){
      return null;
    }
    return decoded.role;
  }
  public getActiveUserId():string{
    if(typeof localStorage[this.tokenIdentificator] !== 'undefined'){
      return null;
    }
    const decoded: any = jwt_decode(localStorage[this.tokenIdentificator]);
    if(decoded.sub === undefined){
      return null;
    }
    return decoded.sub;
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
