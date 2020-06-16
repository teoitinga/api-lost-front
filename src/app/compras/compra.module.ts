import { MaterialModule } from './../library/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompraRoutingModule } from './compra-routing.module';
import { ComprarComponent } from './components/comprar/comprar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CompraService } from './services/compra.service';
import { TodasComprasComponent } from './components/todas-compras/todas-compras.component';
import { QuitadasComprasComponent } from './components/quitadas-compras/quitadas-compras.component';
import { DebitoComprasComponent } from './components/debito-compras/debito-compras.component';


@NgModule({
  declarations: [ComprarComponent, TodasComprasComponent, QuitadasComprasComponent, DebitoComprasComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule,

    CompraRoutingModule
  ],
  providers:[
    CompraService
  ]
})
export class CompraModule { }
