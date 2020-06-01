import { logging } from 'protractor';
import { AccountService } from 'src/app/shared/service/account.service';
import { Component, OnInit, ɵConsole } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { ClienteService } from '../services';
import { HeaderUtilService } from 'src/app/shared';
import { ClientePostModel } from '../models';
import { ClientePutModel } from '../models/cliente-put.model';
import { throwMatDialogContentAlreadyAttachedError } from '@angular/material/dialog';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {
  form: FormGroup;
  cliente: ClientePutModel;
  idCliente: string;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private serviceCliente: ClienteService,
    private header: HeaderUtilService,
    private accountService: AccountService,
    private route: ActivatedRoute
  ) {
    
   }

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
      nome: this.cliente.nome,
      apelido: this.cliente.apelido,
      endereco: this.cliente.endereco,
      fone: this.cliente.fone,
      rg: this.cliente.rg,
      prazo: this.cliente.prazo
    });
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
    this.carregaDadosDoCliente();
  }
  atualizar(){
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
    
  }
  getIdCliente(): string {
    return this.route.snapshot.params['id'];
  }
}
