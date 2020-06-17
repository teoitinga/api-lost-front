import { ItemModel } from './item.model';

export interface CompraListModel {
    codigo: number;
    dataCompra: string;
    dataPagamento?: any;
    recebedor: string;
    vendedor: string;
    clienteNome: string;
    valorCompra: number;
    itens: ItemModel[];
}