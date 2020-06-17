import { Component, OnInit, ViewChild } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountService } from 'src/app/shared/service/account.service';

import { ClienteService } from 'src/app/clientes';
import { CompraListModel } from '../../models/compra-lista.model';

@Component({
  selector: 'app-debito-compras',
  templateUrl: './debito-compras.component.html',
  styleUrls: ['./debito-compras.component.css']
})
export class DebitoComprasComponent implements OnInit {

  
  compras: CompraListModel[];
  displayedColumns: string[] = [ 'dataDaCompra', 'recebedor', 'valorCompra', 'vendedor' ];
  
  spinnerVisible:boolean = false;
  
  dataSource = new MatTableDataSource<CompraListModel>();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  
  constructor(
    private clienteService: ClienteService,
    private accountService: AccountService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.accountService.headerData = {
      title:'Lista de compras em débito do cliente',
      icon: 'recent_actors',
      routeUrl: '/',
      user: this.accountService.getActiveUserName()
  }
   }

  ngOnInit(): void {
    this.show();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.listarComprasDebito();

  }
  listarComprasDebito(){
    const idcliente = this.getIdCliente();
    console.log("Obtendo dados das compra de cliente com id: " + idcliente)
    this.clienteService.listarComprasDebito(idcliente)
    .subscribe(data=>{
      this.compras = data;
      this.dataSource = new MatTableDataSource<CompraListModel>(this.compras);
      this.hide();
    }, 
    err=>{
      let msg: string = "Não há compras em débito registradas!";
      msg = msg + JSON.stringify(err.message);
      this.hide();
      console.info("Verificando compras em debito -> " + JSON.stringify(err.message));
      
      this.accountService.showMessage("Não há compras em débito registradas!", "Verificando compras.", false, this.snackBar);
    });
  }
  show() {
    this.spinnerVisible = true;
  }

  hide() {
    this.spinnerVisible = false;
  }
  getIdCliente(): string {
    return this.route.snapshot.params['id'];
  }
}
