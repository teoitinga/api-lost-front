import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[Carregado]'
})
export class CarregadoDirective {

  constructor(private el: ElementRef) { 
    el.nativeElement.style.display = 'block';
  }

}
