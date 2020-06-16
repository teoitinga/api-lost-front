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
  ) {
    this.accountService.headerData = {
      title: 'Registra novo Cliente',
      icon: 'add_circle_outline',
      routeUrl: '/novo',
      user: this.accountService.getActiveUserName()
    }
  }

  ngOnInit(): void {
    this.geraForm();
  }

  geraForm() {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(10)]],
      apelido: ['', [Validators.required, Validators.minLength(2)]],
      endereco: ['', [Validators.minLength(10)]],
      fone: ['', [Validators.minLength(10)]],
      rg: ['', [Validators.minLength(11)]],
      prazo: ['30', [Validators.required, Validators.minLength(2)]]
    })
  }
  cadastrar() {
    if (this.form.invalid) {
      return;
    }
    let cliente: ClientePostModel = this.form.value;

    cliente.vendedor = this.accountService.getActiveUserId();

    this.serviceCliente.cadastrar(cliente).subscribe(
      data => {
        console.log(JSON.stringify(data));
        this.router.navigate(['/clientes'])
        const msg: string = "Cliente registrado com sucesso.";
        this.snackBar.open(msg, "Sucesso", { duration: 5000 });
        this.accountService.showMessage(msg, "Sucesso", false, this.snackBar);
      },
      err => {
        console.error("Erro encontrado -> " + JSON.stringify(err.message));
        let msg: string = "Ocorreu un erro: ";
        msg = msg + JSON.stringify(err.message);
        this.accountService.showMessage(msg, "Erro", true, this.snackBar);
      }
    );
    return false;

  }
}
