import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/shared/service/account.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  constructor(
    private accountService: AccountService
  ) { 
    this.accountService.headerData = {
      title:'Painel do vendedor',
      icon: 'recent_actors',
      routeUrl: '/',
      user: this.accountService.getActiveUserName()
  }
  }

  ngOnInit(): void {
  }

}
