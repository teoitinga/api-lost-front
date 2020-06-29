import { DashboardComponent } from './dashboard/dashboard.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { LastTeenComprasComponent } from './components/last-teen-compras/last-teen-compras.component';

import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ListaComprasComponent } from './compras/components/lista-compras/lista-compras.component';
import { ListaComponent } from './compras/components/lista/lista.component';

export const routes: Routes = [
    { 
        path: 'usuarios',
        component: UsuarioComponent,

        children: [
            {
            path: 'novo',
            component: LastTeenComprasComponent
            },
            {
            path: 'editar/:id',
            component: LastTeenComprasComponent
            },
            {
            path: '',
            component: LastTeenComprasComponent //ListaComprasComponent
            },
            {
            path: 'dashboard',
            component: DashboardComponent
            },
            {
            path: 'lista',
            component: ListaComponent
            }
    ]
    }
]
@NgModule({
    imports:[
        RouterModule.forChild(routes)
    ],
    exports:[
        RouterModule
    ]
})
export class UsuarioRoutingModule { }