import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[Carregando]'
})
export class CarregandoDirective {

  constructor(private el: ElementRef) { 
    el.nativeElement.style.display = 'none';
  }

}
