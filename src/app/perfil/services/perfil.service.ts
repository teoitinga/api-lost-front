import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeaderUtilService } from 'src/app/shared';
import { AccountService } from 'src/app/shared/service/account.service';
import { Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  private readonly PATH: string = 'perfil';
  
  constructor(
    private http: HttpClient,
    private headerUtils: HeaderUtilService,
    private accountService: AccountService
  ) { }
  getProfile(): Observable<any> {
    return this.http.get(`${env.baseApiUrl}${this.PATH}`);
  }
}
