import { PerfilDataComponent } from './components/perfil/perfil.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PerfilComponent } from './components/perfil.component';


const routes: Routes = [
  {
    path: 'perfil',
    component: PerfilComponent,
    children: [
        {
        path: '',
        component: PerfilDataComponent
        }
]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerfilRoutingModule { }
