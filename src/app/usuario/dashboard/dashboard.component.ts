import { PainelModel } from './painel.model';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountService } from 'src/app/shared/service/account.service';
import { PerfilService } from 'src/app/perfil/services/perfil.service';
import { UsuarioService } from '../services/usuario.service';

declare var google: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  spinnerVisible:boolean = false;
  painel: PainelModel;
  
  private dados: any;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private snackBar: MatSnackBar,
    private router: Router,
    private accountService: AccountService,
    private route: ActivatedRoute,
    private perfilService: PerfilService,
    private usuarioService: UsuarioService
    ) {}
    ngOnInit(): void {
      this.obterDadosGraph();
      this.show();
      this.getInformacoes();

    }
    obterDadosGraph(){
      this.usuarioService.getFluxoDeVendas()
        .subscribe(
        dados=>{
          this.dados = dados;
          this.init();
        }
      );
    }
    init(): void{
      if(typeof(google) !=='undefined'){
        //google.charts.load('current', {'packages': ['corechart']});
        google.charts.load('current', {packages: ['corechart']});
        setTimeout(()=>{
          //google.charts.setOnLoadCallback(this.exibirGraficos());
          google.charts.setOnLoadCallback(this.exibirGraficos());
        }, 1000);
      }
    }
    exibirGraficos(){
      this.exibirPieChart();
    }
    exibirPieChart(){
      const el = document.getElementById('pie_chart');
      //const chart = new google.visualization.PieChart(el);
      var data = new google.visualization.DataTable();
      data.addColumn('string', 'Element');
      data.addColumn('number', 'Percentage');
      data.addRows([
        ['Nitrogen', 0.78],
        ['Oxygen', 0.21],
        ['Other', 0.01]
      ]);
      //chart.draw(this.obterDataTable(), this.obterOpcoes());
      // Instantiate and draw the chart.
      const chart = new google.visualization.PieChart(document.getElementById('pie_chart'));
      chart.draw(data, null);
    }
    obterDataTable():any{
      const data = new google.vizualization.DataTable();
      data.addColumn('string', 'Mês');
      data.addColumn('number', 'Quantidade');
      data.addRows(this.dados);
      return data;
    }
    obterOpcoes(): any{
      return {
        'title': 'Quantidade de cadastros no primeiro semestre',
        'width': 400,
        'heigth': 300
      }
    }
    show() {
      this.spinnerVisible = true;
    }
  
    hide() {
      this.spinnerVisible = false;
    }
    getInformacoes(){
  
      this.usuarioService.getPainel().subscribe(
        data=>{
          this.painel = data;
          console.log("Dados: " + JSON.stringify(this.painel))
          this.hide();
        },
        err=>{
          console.error("Erro encontrado -> " + JSON.stringify(err.message));
          let msg: string = "Ocorreu un erro: ";
          msg = msg + JSON.stringify(err.message);
          this.accountService.showMessage(msg, "Erro", true, this.snackBar);
          this.hide();
        }
      );
      return false;
      
    }
}
