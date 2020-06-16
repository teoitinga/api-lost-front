import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountService } from 'src/app/shared/service/account.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ClienteService } from '../services';
import { ListarClienteModel } from '../listar-cliente.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Subject, Observable, Subscription } from 'rxjs';


@Component({
  selector: 'app-listar-cliente',
  templateUrl: './listar-cliente.component.html',
  styleUrls: ['./listar-cliente.component.css']
})
export class ListarClienteComponent implements OnInit {
  
  clientes: ListarClienteModel[];
  displayedColumns: string[] = [ 'nome', 'apelido', 'debito', 'options' ];
  
  spinnerVisible:boolean = false;
  
  dataSource = new MatTableDataSource<ListarClienteModel>();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  
  constructor(
    private clienteService: ClienteService,
    private accountService: AccountService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router,
  ) { 
    this.accountService.headerData = {
        title:'Lista de Clientes',
        icon: 'recent_actors',
        routeUrl: '/',
        user: this.accountService.getActiveUserName()
    }
  }

  ngOnInit(): void {
    this.show();
    this.listar();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }
  show() {
    this.spinnerVisible = true;
  }

  hide() {
    this.spinnerVisible = false;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  quitar($event: any, id:string, nome:string){
    $event.preventDefault();
    this.show();
    if(confirm('Tem certeza que deseja quitar os débitos de '+ nome +'?')){
      this.clienteService.quitaDebitos(id).subscribe(
        data=>{
          let msg: string = "Conta quitada com sucesso: cliente: " + nome;
          console.error(msg);
          this.listar();
          this.accountService.showMessage(msg, "Conta quitada!", false, this.snackBar);
          this.hide();
        },
        err=>{
          let msg: string = "Ocorreu un erro: ";
          msg = msg + JSON.stringify(err.message);
          this.hide();
          console.error("Erro encontrado -> " + JSON.stringify(err.message));
          
          this.accountService.showMessage(msg, "Erro", true, this.snackBar);         
        }
      );
      this.router.navigate(['/clientes']);

    }
  }
  listar(){
    this.clienteService.listar()
    .subscribe(data=>{
      this.clientes = data;
      this.dataSource = new MatTableDataSource<ListarClienteModel>(this.clientes);
      this.hide();
    },
    err=>{
      let msg: string = "Ocorreu un erro: ";
      msg = msg + JSON.stringify(err.message);
      this.hide();
      console.error("Erro encontrado -> " + JSON.stringify(err.message));
      
      this.accountService.showMessage(msg, "Erro", true, this.snackBar);
    });
  }
}
