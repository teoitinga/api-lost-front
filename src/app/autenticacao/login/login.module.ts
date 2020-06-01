import { LoginRoutingModule } from './login-routing.module';
import { NgModule } from '@angular/core';
import { MaterialModule } from './../../library/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { LoginComponent, LogarComponent } from './components';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginService } from './services';


@NgModule({
  declarations: [
    LoginComponent,
    LogarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    FlexLayoutModule,
    LoginRoutingModule
  ],
  providers:[
    LoginService
  ]
})
export class LoginModule { }
