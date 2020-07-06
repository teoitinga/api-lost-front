import { map } from 'rxjs/operators';

import { Component } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';
import { files } from './example-data';
import { teenfiles } from '../../models/dash-data';
import { NestedTreeControl } from '@angular/cdk/tree';

import { MatTreeNestedDataSource } from '@angular/material/tree';
import { CompraTreeNode } from '../../models/CompraTreeNode';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountService } from 'src/app/shared/service/account.service';
import { PerfilService } from 'src/app/perfil/services/perfil.service';
import { UsuarioService } from 'src/app/usuario/services/usuario.service';
import { PainelModel } from 'src/app/usuario/dashboard/painel.model';
import { FluxoMensal } from 'src/app/usuario/dashboard/fluxo-mensal.model';

declare var google: any;

class DataChart{
  private line:string;
  private value:number;

  constructor(line: string, value:number){
    this.line = line;
    this.value = value;
  }
}
@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent {
  spinnerVisible: boolean = false;

  private dados=[];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private snackBar: MatSnackBar,
    private router: Router,
    private accountService: AccountService,
    private route: ActivatedRoute,
    private perfilService: PerfilService,
    private usuarioService: UsuarioService
  ) { }
  ngOnInit(): void {
    this.carregaDados();
    this.show();
  }

  carregaDados(){
    this.usuarioService.getFluxoDeVendas()
      .subscribe(
        dados => {
          this.dados = dados;
          this.init();
        }
      );
  }
  init(): void {
    if (typeof (google) !== 'undefined') {
      google.charts.load('current', { packages: ['corechart'] });
      setTimeout(() => {
        google.charts.setOnLoadCallback(this.exibirGraficos());
      }, 1000);
    }
  }
  exibirGraficos() {
    this.exibirPieChart();
    this.exibirChart();
  }
 
  exibirChart(){
    const el = document.getElementById('column_chart');
    
    // Instantiate and draw the chart.
    const chart = new google.visualization.ColumnChart(el);
    chart.draw(this.obterDataTable(), this.obterOpcoes());   
  }
  exibirPieChart() {
    const el = document.getElementById('pie_chart');
    // Instantiate and draw the chart.
    const chart = new google.visualization.PieChart(el);
    //chart.draw(this.obterDataTable(), null);
    chart.draw(this.obterDataTable(), this.obterOpcoes());
  }

  obterDataTable(): any {
    let data = new google.visualization.DataTable();
    data.addColumn('string', 'Mês/Ano');
    data.addColumn('number', 'Vendas');
    let dadosAPI = this.dados.map(info => new DataChart(info.mes + "/" + info.ano, info.valor));
    data.addRows(dadosAPI.length);
        for(let index = 0; index<dadosAPI.length;index++){
          data.setCell(index, 0, dadosAPI[index]['line']);
          data.setCell(index, 1, dadosAPI[index]['value']);
        }

    return data;
  }
 
  obterOpcoes(): any {
    return {
      'title': 'Quantidade de Vendas no último ano',
      'width': 600,
      'heigth': 400
    }
  }
  show() {
    this.spinnerVisible = true;
  }

  hide() {
    this.spinnerVisible = false;
  }

}
