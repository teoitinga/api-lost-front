import { DebitoComprasComponent } from './components/debito-compras/debito-compras.component';
import { QuitadasComprasComponent } from './components/quitadas-compras/quitadas-compras.component';
import { TodasComprasComponent } from './components/todas-compras/todas-compras.component';
import { MaterialModule } from './../library/material.module';
import { CompraComponent } from './components/compra/compra.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComprarComponent } from './components/comprar/comprar.component';


const routes: Routes = [
  {
    path: 'compras',
    component: CompraComponent,
    children: [
      {
      path: ':id',
      component: ComprarComponent
      },
      {
      path: 'cliente/:id',
      component: TodasComprasComponent
      },
      {
      path: 'cliente/quit/:id',
      component: QuitadasComprasComponent
      },
      {
      path: 'cliente/noquit/:id',
      component: DebitoComprasComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class CompraRoutingModule { }
