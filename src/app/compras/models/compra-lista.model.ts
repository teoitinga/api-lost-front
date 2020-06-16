import { ItemModel } from './item.model';
export interface CompraListModel {
    clienteNome: string;
    codigo: number;
    dataCompra: string;
    dataPagamento: string;
    itens: ItemModel[];
    recebedor: string;
    valorCompra: number;
    vendedor: string;
}