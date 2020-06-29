import { UsuarioService } from './services/usuario.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AccountService } from 'src/app/shared/service/account.service';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LastTeenComprasComponent } from './components/last-teen-compras/last-teen-compras.component';
import { UsuarioComponent } from './components/usuario/usuario.component';

import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Interceptor } from '../shared/service/http-interceptor';
import { TreetableModule } from 'ng-material-treetable';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { LayoutModule } from '@angular/cdk/layout';
import { ListaComprasComponent, ChecklistDatabase } from './compras/components/lista-compras/lista-compras.component';
import { MatSelectModule } from '@angular/material/select';
import { ListaComponent } from './compras/components/lista/lista.component';
import {CdkTreeModule} from '@angular/cdk/tree';
import {MatExpansionModule} from '@angular/material/expansion';
import { LostDatePipe } from '../shared/pipe/lost-date';
import { MatSnackBar } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    LastTeenComprasComponent,
     UsuarioComponent, 
     DashboardComponent, 
     ListaComprasComponent, 
     ListaComponent
    ],
  imports: [
    CommonModule,
    MatTreeModule,
    MatIconModule,
    TreetableModule,
    MatButtonModule,
    MatSelectModule,
    MatExpansionModule,
    CdkTreeModule,
    RouterModule,
    Interceptor,
    MatGridListModule,
    MatCardModule,
    MatCheckboxModule,
    MatMenuModule,
    LayoutModule
  ],
  providers:[
    AccountService,
    UsuarioService,
    MatSnackBar,
    UsuarioService,
    ChecklistDatabase
  ]
})
export class UsuarioModule { }
