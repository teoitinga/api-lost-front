import { ItemModel } from './../models/item.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CompraModel } from '../models/compra.model';
import { environment as env } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { HeaderUtilService } from 'src/app/shared';
import { AccountService } from 'src/app/shared/service/account.service';

@Injectable()
export class CompraService {

  private readonly PATH: string = 'compras';

 
  ITEM_DATA_NAME: string = "itens";

  constructor(
    private http: HttpClient,
    private headerUtils: HeaderUtilService,
    private accountService: AccountService
  ) { }

  registrarCompra(compraActive: CompraModel): Observable<any> {
    return this.http.post(env.baseApiUrl + this.PATH, compraActive);
  }
  removerItem(item: ItemModel) {
    let array = this.listarItens();

    const arrayItens = array.filter((itemremove) => JSON.stringify(itemremove) != JSON.stringify(item));

    localStorage[this.ITEM_DATA_NAME] = JSON.stringify(arrayItens);
    this.listarItens();
  }
  
  listarItens(): ItemModel[] {
    //return localStorage[this.ITEM_DATA_NAME] ? JSON.parse(localStorage[this.ITEM_DATA_NAME]) : this.removeItensDeCompraLocais();
    if (localStorage[this.ITEM_DATA_NAME]) {
      return JSON.parse(localStorage[this.ITEM_DATA_NAME])
    }
    return [];
  }

  removeItensDeCompraLocais(): ItemModel[] {
    if (localStorage[this.ITEM_DATA_NAME]) {
      delete localStorage[this.ITEM_DATA_NAME];
    }
    return this.listarItens();
  }
  cadastrarItem(item: ItemModel): void {
    let itens = this.listarItens();
    itens.push(item);
    localStorage[this.ITEM_DATA_NAME] = JSON.stringify(itens);
  }

  nextItemInLine({ itens, item }: { itens: ItemModel[]; item: ItemModel; }) {
    itens.push(item);
    var removed = itens.shift();
    return removed;  // Change this line
  }
}
