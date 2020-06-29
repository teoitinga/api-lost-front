import { PerfilRoutingModule } from './perfil/perfil-routing.module';
import { UsuarioRoutingModule } from './usuario/usuario-routing.module';
import { ClienteService } from 'src/app/clientes';
import { CompraModule } from './compras/compra.module';
import { CompraRoutingModule } from './compras/compra-routing.module';
import { AccountService } from './shared/service/account.service';
import { httpInterceptorService, Interceptor } from './shared/service/http-interceptor';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './library';
import { LoginModule, LoginRoutingModule } from './autenticacao';
import { AppRoutingModule } from './app-routing.module';
import { ClientesModule, ClienteRoutingModule } from './clientes';
import { CabecalhoComponent } from './cabecalho/cabecalho.component';
import { RodapeComponent } from './rodape/rodape.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { InternalServerErrorComponent } from './internal-server-error/internal-server-error.component';
import { CompraComponent } from './compras/components/compra/compra.component';
import { UsuarioModule } from './usuario/usuario.module';
import { TreeViewModule } from '@progress/kendo-angular-treeview';
import { LostDatePipe } from './shared/pipe/lost-date';
import { CarregandoDirective } from './shared/directives/carregando.directive';
import { CarregadoDirective } from './shared/directives/carregado.directive';
import { PerfilModule } from './perfil/perfil.module';

@NgModule({
  declarations: [
    AppComponent,
    CabecalhoComponent,
    RodapeComponent,
    ForbiddenComponent,
    NotfoundComponent,
    InternalServerErrorComponent,
    CompraComponent,
    CarregandoDirective,
    CarregadoDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule,
    LoginModule,
    Interceptor,
    LoginRoutingModule,
    ClientesModule,
    ClienteRoutingModule,
    CompraRoutingModule,
    CompraModule,
    UsuarioRoutingModule,
    UsuarioModule,
    PerfilRoutingModule,
    PerfilModule,
    AppRoutingModule,
    
    TreeViewModule
  ],
  providers: [
    Interceptor,
    AccountService,
    ClienteService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
