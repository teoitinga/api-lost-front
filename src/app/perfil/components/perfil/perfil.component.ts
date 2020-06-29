import { MaterialModule } from './../../../library/material.module';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountService } from 'src/app/shared/service/account.service';
import { PerfilService } from '../../services/perfil.service';
import { PerfilModel } from '../../perfil-model';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilDataComponent implements OnInit {
  
  perfil: PerfilModel;
  spinnerVisible:boolean = false;
  
  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private accountService: AccountService,
    private route: ActivatedRoute,
    private perfilService: PerfilService
  ) { }

  ngOnInit(): void {
    this.show();
    this.getInformacoes();
  }
  show() {
    this.spinnerVisible = true;
  }

  hide() {
    this.spinnerVisible = false;
  }
  getInformacoes(){

    let perfil: PerfilModel;

    this.perfilService.getProfile().subscribe(
      data=>{
        this.perfil = data;
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
