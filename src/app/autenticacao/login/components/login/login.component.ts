import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { LoginService } from './../../services/login.service';

import { LoginPost } from './../../models';
import { AccountService } from 'src/app/shared/service/account.service';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private loginService: LoginService,
    private accountService: AccountService
  ) {
    this.accountService.headerData = {
      title:'Login',
      icon: 'security',
      routeUrl: '/login',
      user: this.accountService.getActiveUserName()
  } 
   }

  ngOnInit(): void {
    this.gerarForm();
  }
  gerarForm() {
    this.form = this.fb.group(
      {
        login: ['', [Validators.required]],
        senha: ['', [Validators.required, Validators.minLength(3)]]
      }
    );
  }
  logar(){
    console.log("logar-> Tentando realizar login");
    if(this.form.invalid){
      this.snackBar.open(
        "Dados invalidos", "Erro", {duration:5000}
      );
      return;
    }
    const login: LoginPost = this.form.value;
    this.accountService.logar(login).subscribe(
      data => {
        this.accountService.login(data[this.accountService.tokenIdentificator]);
      },
      err=>{
        console.error("Erro encontrado -> " + JSON.stringify(err.message));
        let msg: string = "Ocorreu un erro: ";
        msg = msg + JSON.stringify(err.message);
        this.accountService.showMessage(msg, "Erro de login", true, this.snackBar);
      }
    );

  }

}
