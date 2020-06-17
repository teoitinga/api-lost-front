import { UsuarioComponent } from './components/usuario/usuario.component';
import { LastTeenComprasComponent } from './components/last-teen-compras/last-teen-compras.component';

import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
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