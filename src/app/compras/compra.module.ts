import { MaterialModule } from './../library/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDatepickerModule} from '@angular/material/datepicker'
import { CompraRoutingModule } from './compra-routing.module';
import { ComprarComponent } from './components/comprar/comprar.component';


@NgModule({
  declarations: [ComprarComponent],
  imports: [
    CommonModule,
    MaterialModule,
    MatDatepickerModule,
    CompraRoutingModule
  ]
})
export class CompraModule { }
