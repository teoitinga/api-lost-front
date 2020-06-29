import { CompraTreeNode } from './../../compras/models/CompraTreeNode';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { teenfiles } from '../../compras/models/dash-data';
import { ItemNode } from '../../compras/models/CompraTreeNode';
import { UsuarioService } from '../../services/usuario.service';
import { AccountService } from 'src/app/shared/service/account.service';

@Component({
  selector: 'app-last-teen-compras',
  templateUrl: './last-teen-compras.component.html',
  styleUrls: ['./last-teen-compras.component.css']
})
export class LastTeenComprasComponent implements OnInit {

  panelOpenState = false;
  compras: CompraTreeNode;// = teenfiles;
  spinnerVisible = true; 

  constructor(
    private usuarioService: UsuarioService,
    private snackBar: MatSnackBar,
    private accountService: AccountService
  ) { 

    this.loadTeenLastCompras();
  }

  ngOnInit(): void {
  }
  loadTeenLastCompras(){
      console.log("Obtendo dados das ultimas 10 compras registradas.");

      this.usuarioService.getTeenLastCompras()
      .subscribe(data=>{
        this.compras = data;
        console.log("Dados encontrados: " + JSON.stringify(this.compras));
        this.hideSpiner();
      },
      err=>{
        let msg: string = "Ocorreu un erro ao buscar compas: ";
        msg = msg + JSON.stringify(err.message);
        this.hideSpiner();
        console.error("Erro encontrado -> " + JSON.stringify(err.message));
        
        this.accountService.showMessage(msg, "Erro", true, this.snackBar);
      });
    }
  valorDoItem(item: ItemNode) {
    return (item.unitvalue * item.qtd) - item.desconto;
  }
  showSpiner() {
    this.spinnerVisible = true;
  }
  hideSpiner() {
    this.spinnerVisible = false;
  }
}
