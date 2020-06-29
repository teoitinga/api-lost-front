
import { PerfilModel } from './../perfil-model';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-components',
  templateUrl: './components.component.html',
  styleUrls: ['./components.component.css']
})
export class PerfilComponent implements OnInit {
  
  perfil: PerfilModel;
  
  constructor(

  ) { }

  ngOnInit(): void {

  }

}
