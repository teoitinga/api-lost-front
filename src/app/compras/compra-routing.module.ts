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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompraRoutingModule { }
