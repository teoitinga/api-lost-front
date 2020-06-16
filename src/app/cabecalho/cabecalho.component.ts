import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../shared/service/account.service';

@Component({
  selector: 'app-cabecalho',
  templateUrl: './cabecalho.component.html',
  styleUrls: ['./cabecalho.component.css']
})
export class CabecalhoComponent implements OnInit {
  
  public usuario: string;
  
  constructor(
    private router: Router,
    private accountService: AccountService
    ) { }

  ngOnInit(): void {

  }
  sair(){
    if(this.accountService.isLoggedIn()){
      this.accountService.logout();
    }
    this.router.navigate(['/']);
  }
  login(){
    this.router.navigate(['/login']);
  }
  autenticado(){
    
    return this.accountService.isLoggedIn();
  }
  irParaHome(){
    this.router.navigate(['/'])
  }
  irParaCadastrar(){
    this.router.navigate(['/clientes/novo'])
  }
  irParaListarClientes(){
    this.router.navigate(['/clientes'])
  }

  get title():string{
    return this.accountService.headerData.title;
  }
  get icon():string{
    return this.accountService.headerData.icon;
  }
  get routeUrl():string{
    return this.accountService.headerData.routeUrl;
  }
  get user():string{
    return this.accountService.headerData.user;
  }
}
