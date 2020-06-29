import { PerfilDataComponent } from './components/perfil/perfil.component';
import { PerfilComponent } from './components/perfil.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerfilRoutingModule } from './perfil-routing.module';
import { PerfilService } from './services/perfil.service';
import { MaterialModule } from '../library/material.module';


@NgModule({
  declarations: [
    PerfilComponent,
    PerfilDataComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    PerfilRoutingModule
  ],
  providers:[
    PerfilService
  ]
})
export class PerfilModule { }
