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
        }
      );
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
