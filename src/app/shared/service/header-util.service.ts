import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class HeaderUtilService {

  constructor() { }
  headers(){
    
    let httpHeaders: HttpHeaders = new HttpHeaders();

    if(localStorage['token']){
      console.info('Inserindo header...'+'Authorization', 'Bearer ' + localStorage['token'])
      httpHeaders = httpHeaders.set(
        'Authorization', 'Bearer ' + localStorage['token']
      );
    }
    return { headers: httpHeaders };
  }
  getUserData(){
    if(!localStorage['token']){
      return '';
    }else{
      return JSON.parse(atob(localStorage['token'].split('.')[1]));
    }
  }
  getUserId(): string{
    if(!localStorage['token']){
      return '';
    }else{
      const userData = this.getUserData();
      return userData?userData.id:'';
    }
  }
}
