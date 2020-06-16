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
/*
const ELEMENT_DATA: ItemModel[] = [
  {desconto: 1, dsc: 'Cachaça', qtd: 5, vlunit: 1},
  {desconto: 0, dsc: 'Mortadela', qtd: 5.86, vlunit: 3.5},
  {desconto: 3, dsc: 'Pão de sal', qtd: 4.3, vlunit: 5},
  {desconto: 2.2, dsc: 'Voodka', qtd: 8.6, vlunit: 6.25},
];
*/
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
  dataSource: ItemModel[] = [];//new MatTableDataSource<ItemModel>();
  item: ItemModel;
  
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
    //this.dataSource = new MatTableDataSource<ItemModel>(this.compraService.listarItens());
  }
  cancelar($event: any) {
    $event.preventDefault();
    if(confirm('Tem certeza que deseja cancelar esta compra?')){
      this.compraService.removeItensDeCompraLocais();
      this.router.navigate(['/clientes']);

    }
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
      recebebida: ['', [Validators.required, Validators.minLength(10)]]
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
  }
  public comprar() {

    if(this.formCompra.invalid){
      return;
    }
    let compraActive: CompraModel = this.formCompra.value;

    compraActive.vendedor = this.accountService.getActiveUserId();//"1";//this.header.getUserId();
    compraActive.cliente = this.getIdCliente();
    const id: string = this.getIdCliente();
    compraActive.itens = this.compraService.listarItens();
    this.compraService.registrarCompra(compraActive).subscribe(
      data=>{
        console.log(JSON.stringify(data));
        this.router.navigate(['/clientes'])
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
