import { environment as env } from './../../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeaderUtilService } from 'src/app/shared';
import { AccountService } from 'src/app/shared/service/account.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  
  private readonly PATH: string = 'compras/teen';
  private readonly PATH_PAINEL: string = 'perfil/painel';
  private readonly PATH_FLUXO_DE_VENDAS: string = 'perfil/fluxoMensalVendas';
  
  constructor(
    private http: HttpClient,
    private headerUtils: HeaderUtilService,
    private accountService: AccountService

  ) { }

  getTeenLastCompras(): Observable<any> {
    return this.http.get(env.baseApiUrl + this.PATH);
  }
  getFluxoDeVendas(): Observable<any> {
    return this.http.get(env.baseApiUrl + this.PATH_FLUXO_DE_VENDAS);
  }
  getPainel():Observable<any>{
    return this.http.get(env.baseApiUrl + this.PATH_PAINEL);
  }
}
