import { Component, OnInit, ViewChild } from '@angular/core';
import { ClienteService } from '../services';
import { ListarClienteModel } from '../listar-cliente.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-listar-cliente',
  templateUrl: './listar-cliente.component.html',
  styleUrls: ['./listar-cliente.component.css']
})
export class ListarClienteComponent implements OnInit {
  
  clientes: ListarClienteModel[];
  displayedColumns: string[] = [ 'nome', 'apelido', 'debito', 'options' ];
  
  dataSource = new MatTableDataSource<ListarClienteModel>();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  
  constructor(
    private clienteService: ClienteService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.listar();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  listar(){
    this.clienteService.listar()
    .subscribe(data=>{
      this.clientes = data;
      this.dataSource = new MatTableDataSource<ListarClienteModel>(this.clientes);
    },
    err=>{
      console.error("Ocorreu um erro: " + err);
    });
  }
}
