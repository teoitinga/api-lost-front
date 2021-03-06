import { ItemModel } from './../../models/item.model';
import { logging } from 'protractor';
import { Component, OnInit, ɵConsole } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientePutModel } from '../../../clientes/models/cliente-put.model';
import { throwMatDialogContentAlreadyAttachedError } from '@angular/material/dialog';

import * as moment from 'moment';
import { AccountService } from 'src/app/shared/service/account.service';
import { ClienteService } from 'src/app/clientes';
import { CompraService } from '../../services/compra.service';
import { MatTableDataSource } from '@angular/material/table';
import { JsonPipe } from '@angular/common';
import { CompraModel } from '../../models/compra.model';

@Component({
  selector: 'app-comprar',
  templateUrl: './comprar.component.html',
  styleUrls: ['./comprar.component.css'],
})
export class ComprarComponent implements OnInit {

  formCompra: FormGroup;
  formItem: FormGroup;
  public cliente: ClientePutModel;
  idCliente: string;
  displayedColumns: string[] = ['dsc','vlunt', 'qtd', 'desconto', 'total', 'options'];
  dataSource: ItemModel[] = [];
  item: ItemModel = {
    description: '',
    desconto: 0,
    qtd: 1,
    unitvalue: 0
  };
  valorDoItem: number = 0;
  valorDaCompra: number = 0;
  constructor(
    
    private serviceCliente: ClienteService,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private accountService: AccountService,
    private route: ActivatedRoute,
    private compraService: CompraService
  ) { 
    this.accountService.headerData = {
      title: 'Registrar Compras',
      icon: 'add_circle_outline',
      routeUrl: '/compras',
      user: this.accountService.getActiveUserName()
    }
  }

  ngOnInit(): void {
    this.geraForm();
    this.carregaDadosDoCliente();
    this.compraService.removeItensDeCompraLocais();
    this.carregaItens();
  }
  carregaItens() {
    this.dataSource = this.compraService.listarItens()
    this.somaCompra();
  }
  cancelar($event: any) {
    $event.preventDefault();
    if(confirm('Tem certeza que deseja cancelar esta compra?')){
      this.compraService.removeItensDeCompraLocais();
      this.router.navigate(['/clientes']);

    }
  }
  valor_total(item: ItemModel): number{
    return (item.qtd*item.unitvalue)-item.desconto;
  }
  somaCompra(){
      this.valorDaCompra = this.dataSource.map(item=>this.valor_total(item)).reduce(function(acumulador, atual){
        console.log(acumulador, atual);
        return acumulador + atual;
      }, 0);
  }

  somaItem(){
    this.item = this.formItem.value;
    this.valorDoItem = this.valor_total(this.item);
  }
  private carregaDadosDoCliente() {
    let id = this.getIdCliente();
    this.serviceCliente.getCliente(id)
      .subscribe(
        data => {
          this.cliente = data;
          this.setForm();
          return data;
        }, 
        err => {
          console.error("Erro encontrado -> " + JSON.stringify(err.message));
          let msg: string = "Ocorreu un erro: ";
          msg = msg + JSON.stringify(err.message);
          this.accountService.showMessage(msg, "Erro", true, this.snackBar);
        });
  }
  private setForm() {
    this.formCompra.setValue({
      dataCompra: moment(),
      recebebida: this.cliente.apelido
    });
  }

  private geraForm() {
    this.formCompra = this.fb.group({
      dataCompra: ['', [Validators.required]],
      recebebida: ['', [Validators.required]]
    })
    this.carregaDadosDoCliente();
    this.geraFormItem();
  }
  novoItem(){
    const item = this.formItem.value;
    if(this.formItem.valid){
      this.compraService.cadastrarItem(item);
      this.carregaItens();
      this.geraFormItem();
    }
  }
  geraFormItem() {
    this.formItem = this.fb.group({
      description: ['', [Validators.required, Validators.minLength(10)]],
      unitvalue: ['0', [Validators.required]],
      qtd: ['1', [Validators.required]],
      desconto: ['0', [Validators.required]],
    });
    this.valorDoItem = 0
  }
  public comprar() {

    if(this.formCompra.invalid){
      return;
    }
    let compraActive: CompraModel = this.formCompra.value;

    compraActive.vendedor = this.accountService.getActiveUserId();
    compraActive.cliente = this.getIdCliente();
    const id: string = this.getIdCliente();
    compraActive.itens = this.compraService.listarItens();
    console.log('Registrando compra: ' + JSON.stringify(compraActive));
    this.compraService.registrarCompra(compraActive).subscribe(
      data=>{
        console.log(JSON.stringify(data));
        this.router.navigate(['/usuarios'])
        this.compraService.removeItensDeCompraLocais();

        const msg: string = "Compra registrada com sucesso.";
        this.accountService.showMessage(msg, "Sucesso", false, this.snackBar);
      },
      err=>{
        console.error("Código do erro: " + JSON.stringify(err.status));
        console.error("Descrição do err: " + JSON.stringify(err.error));
        let msg: string = "Tente novamente mais tarde. ";
        msg = err.error.errors.join(' ');
        this.accountService.showMessage(msg, "Erro", true, this.snackBar);
      }
    );
    return false;

  }
  private getIdCliente(): string {
    return this.route.snapshot.params['id'];
  }

  public removerItem($event: any, item: ItemModel):void{
    $event.preventDefault();

    if(confirm('Deseja remover o item "' + (item.description) + '"?')){
      this.compraService.removerItem(item);

    }
    this.carregaItens();
  }

}
