import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { modulNumbersDirective } from './directives/numbers.directive';



@NgModule({
  declarations: [
    modulNumbersDirective
  ],
  imports: [
    CommonModule
  ],
  exports:[
    modulNumbersDirective
  ]
})
export class SharedModule { }
