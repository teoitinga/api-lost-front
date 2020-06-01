import { AccountService } from './../shared/service/account.service';
import { HeaderUtilService } from './../shared/service/header-util.service';
import { CadastrarClienteComponent } from './cadastrar/cadastrar-cliente.component';
import { NgModule } from '@angular/core';
import { MaterialModule } from './../library/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { ClienteComponent } from './components';
import { ReactiveFormsModule } from '@angular/forms';
import { ClienteService } from './services';
import { ListarClienteComponent } from './listar-cliente/listar-cliente.component';
import { Interceptor } from '../shared/service/http-interceptor';
import { ClienteGuardService } from './services/cliente-guard.service';
import { EditarClienteComponent } from './editar-cliente/editar-cliente.component';

@NgModule({
  declarations: [
    ClienteComponent,
    CadastrarClienteComponent,
    ListarClienteComponent,
    EditarClienteComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    HttpClientModule,
    Interceptor
  ],
  providers:[
    ClienteService,
    ClienteGuardService,
    AccountService,
    HeaderUtilService
  ]
})
export class ClientesModule { }
