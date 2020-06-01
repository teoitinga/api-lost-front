import { ClientePutModel } from './../../../clientes/models/cliente-put.model';
import { ClienteService } from './../../../clientes/services/cliente.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import * as moment from 'moment';

@Component({
  selector: 'app-comprar',
  templateUrl: './comprar.component.html',
  styleUrls: ['./comprar.component.css'],
})
export class ComprarComponent implements OnInit {
  form: FormGroup;
  cliente: ClientePutModel;
  idCliente: string;
  constructor(
    private route: ActivatedRoute,
    private serviceCliente: ClienteService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    ) { }

    ngOnInit(): void {
      this.geraForm();
  
    }
    cancelar(){
      this.router.navigate(['/clientes']);
    }

    carregaDadosDoCliente() {
      let id = this.getIdCliente();
      this.serviceCliente.getCliente(id)
        .subscribe(
          data=>{
            this.cliente = data;
            this.setValue();
          },
          err=>{
            console.error(JSON.stringify(err));
            let msg: string = "Tente novamente mais tarde.";
            if(err.status == 400){
              msg = err.error.errors.join(' ');
    
            }
            this.snackBar.open(msg, "Erro!", {duration:5000});
          });
    }
    setValue() {
      this.form.setValue({
        dataCompra: moment(),
        recebebida: this.cliente.apelido,
      });
    }
        /*
        cliente: number;
    dataCompra: Date;
    id: number;
    itens: Item[];
    recebebida: string;
    vendedor: number;
    */
    geraForm() {/*
      this.form = this.fb.group({
        nome:['', [Validators.required, Validators.minLength(10)]],
        apelido:['', [Validators.required, Validators.minLength(2)]],
        endereco:['', [Validators.minLength(10)]],
        fone:['', [Validators.minLength(10)]],
        rg:['', [Validators.minLength(11)]],
        prazo:['30', [Validators.required, Validators.minLength(2)]]
      })
      this.carregaDadosDoCliente();
      */
    }
    comprar(){
      /*
      if(this.form.invalid){
        return;
      }
      let cliente: ClientePutModel = this.form.value;
      
      cliente.vendedor = this.accountService.getActiveUserId();//"1";//this.header.getUserId();
      
      const id: string = this.getIdCliente();
  
      this.serviceCliente.atualizar(cliente, id).subscribe(
        data=>{
          console.log(JSON.stringify(data));
          this.router.navigate(['/clientes'])
          const msg: string = "Cliente atualizado com sucesso.";
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
      */
    }
    getIdCliente(): string {
      return this.route.snapshot.params['id'];
    }
}
