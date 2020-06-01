import { AccountService } from 'src/app/shared/service/account.service';
import { HeaderUtilService } from './../../shared/service/header-util.service';
import { Component, OnInit, ɵConsole } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { ClienteService } from './../services/cliente.service';
import { ClientePostModel } from './../models/cliente-post..model';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar-cliente.component.html',
  styleUrls: ['./cadastrar-cliente.component.css']
})
export class CadastrarClienteComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private serviceCliente: ClienteService,
    private header: HeaderUtilService,
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
    this.geraForm();
  }
  
  geraForm() {
    this.form = this.fb.group({
      nome:['', [Validators.required, Validators.minLength(10)]],
      apelido:['', [Validators.required, Validators.minLength(2)]],
      endereco:['', [Validators.minLength(10)]],
      fone:['', [Validators.minLength(10)]],
      rg:['', [Validators.minLength(11)]],
      prazo:['30', [Validators.required, Validators.minLength(2)]]
    })
  }
  cadastrar(){
    if(this.form.invalid){
      return;
    }
    let cliente: ClientePostModel = this.form.value;

    cliente.vendedor = this.accountService.getActiveUserId();

    console.log("Registro: " + JSON.stringify(cliente));
    
    this.serviceCliente.cadastrar(cliente).subscribe(
      data=>{
        console.log(JSON.stringify(data));
        this.router.navigate(['/clientes'])
        const msg: string = "Cliente registrado com sucesso.";
        this.snackBar.open(msg, "Sucesso", {duration:5000});
      },
      err=>{
        console.error(JSON.stringify(err));
        let msg: string = "Tente novamente mais tarde.";
        if(err.status == 400){
          msg = err.error.errors.join(' ');

        }
        this.snackBar.open(msg, "Erro!", {duration:5000});
      }
    );
    return false;
    
  }
}
