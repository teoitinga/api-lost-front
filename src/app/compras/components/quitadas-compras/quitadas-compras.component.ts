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
  selector: 'app-quitadas-compras',
  templateUrl: './quitadas-compras.component.html',
  styleUrls: ['./quitadas-compras.component.css']
})
export class QuitadasComprasComponent implements OnInit {

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
      title:'Lista de compras já quitadas do cliente',
      icon: 'recent_actors',
      routeUrl: '/',
      user: this.accountService.getActiveUserName()
  }
  }

  ngOnInit(): void {
    this.show();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.listarQuitadas();

  }
  listarQuitadas(){
    const idcliente = this.getIdCliente();
    console.log("Obtendo dados das compra de cliente com id: " + idcliente)
    this.clienteService.listarComprasQuitadas(idcliente)
    .subscribe(data=>{
      this.compras = data;
      this.dataSource = new MatTableDataSource<CompraListModel>(this.compras);
      this.hide();
    }, 
    err=>{
      let msg: string = "Não há compras quitadas registradas!";
      msg = msg + JSON.stringify(err.message);
      this.hide();
      console.info("Verificando compras em debito -> " + JSON.stringify(err.message));
      
      this.accountService.showMessage("Não há compras quitadas registradas!", "Verificando compras.", false, this.snackBar);
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
