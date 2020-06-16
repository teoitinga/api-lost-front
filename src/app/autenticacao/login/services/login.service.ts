import { AccountService } from './../../../shared/service/account.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment as env } from './../../../../environments/environment.prod';
import { LoginPost } from './../models';

@Injectable()
export class LoginService {
  
  private readonly PATH: string = 'auth';

  constructor(
    private http: HttpClient
    
    ) { }

}
