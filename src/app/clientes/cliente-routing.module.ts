import { EditarClienteComponent } from './editar-cliente/editar-cliente.component';
import { NotfoundComponent } from './../notfound/notfound.component';
import { ListarClienteComponent } from './listar-cliente/listar-cliente.component';
import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { ClienteComponent } from './components';
import { CadastrarClienteComponent } from './cadastrar';
import { ClienteGuardService } from './services/cliente-guard.service';

export const routes: Routes = [
    {
        path: 'clientes',
        component: ClienteComponent,
        canActivate: [
            ClienteGuardService
        ],
        children: [
            {
            path: 'novo',
            component: CadastrarClienteComponent
            },
            {
            path: 'editar/:id',
            component: EditarClienteComponent
            },
            {
            path: '',
            component: ListarClienteComponent
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
export class ClienteRoutingModule { }
