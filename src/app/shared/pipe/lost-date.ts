import { Pipe, PipeTransform } from '@angular/core';
   import { DatePipe } from '@angular/common';
   
   @Pipe({
     name: 'lostdatepipe'
   })
   export class LostDatePipe extends 
                DatePipe implements PipeTransform {
     transform(value: any, args?: any): any {
       return super.transform(value, "d/MM/yyyy HH:mm");
     }
   }