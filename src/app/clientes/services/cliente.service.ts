import { AccountService } from './../../shared/service/account.service';
import { HeaderUtilService } from './../../shared/service/header-util.service';
import { ClientePostModel } from './../models/cliente-post..model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment as env } from 'src/environments/environment.prod';
import { ListarClienteModel } from '../listar-cliente.model';
import { ClientePutModel } from '../models/cliente-put.model';
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class ClienteService {

  private readonly PATH_GET_CLIENTE: string = 'users';
  private readonly PATH: string = 'users/cliente';
  private readonly PATH_PUT: string = 'users';
  private readonly PATH_GETALL: string = 'users';
  private usuario: string;
  // Headers
  httpOptions = {
    headers: new HttpHeaders(
      {
        'Authorization': 'Bearer ' + this.accountService.getAuthorizationToken()
      }
    )
  }
  constructor(
    private http: HttpClient,
    private headerUtils: HeaderUtilService,
    private accountService: AccountService

  ) { 
    this.usuario = this.accountService.getActiveUserId();
  }
  cadastrar(cliente: ClientePostModel): Observable<any> {

    return this.http.post(env.baseApiUrl + this.PATH, cliente);
  }
  atualizar(cliente: ClientePutModel, id:string): Observable<any> {
    //configurando os dados do usuario atual
    cliente.vendedor = this.usuario;
    
    return this.http.put(`${env.baseApiUrl}${this.PATH_PUT}/${id}`, cliente);
  }
  listar(): Observable<any> {

    return this.http.get(env.baseApiUrl + this.PATH_GETALL);
  }
  getCliente(id: string): Observable<any> {

    return this.http.get(`${env.baseApiUrl}${this.PATH_GET_CLIENTE}/${id}`);
  }
}
