import { LogarComponent } from './autenticacao/login/components/logar/logar.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotfoundComponent } from './notfound/notfound.component';

export const routes:Routes = [
    {
        path: '',
        redirectTo:'/login',
        pathMatch:'full'
    },
    {
        path:'login',
        loadChildren: () => import('./autenticacao/login/login.module').then(m => m.LoginModule)
    }
]
@NgModule({
    imports:[
        RouterModule.forRoot(routes)
    ],
    exports:[
        RouterModule
    ]
})
export class AppRoutingModule {
}
