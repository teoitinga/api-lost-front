import { AccountService } from 'src/app/shared/service/account.service';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LastTeenComprasComponent } from './components/last-teen-compras/last-teen-compras.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { ListaComponent } from './compras/components/lista/lista.component';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Interceptor } from '../shared/service/http-interceptor';

@NgModule({
  declarations: [
    LastTeenComprasComponent,
     UsuarioComponent, 
     ListaComponent
    ],
  imports: [
    CommonModule,
    MatTreeModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    Interceptor
  ],
  providers:[
    AccountService,
  ]
})
export class UsuarioModule { }
