import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { LoginComponent, LogarComponent } from './components';

export const routes:Routes = [
    {
        path: 'login',
        component: LogarComponent,
        children: [{
            path: '',
            pathMatch: 'full',
            component: LoginComponent
        }]
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
export class LoginRoutingModule {
}
