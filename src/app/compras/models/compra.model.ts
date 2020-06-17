import { ItemModel } from './item.model';
export interface CompraModel {
    cliente: string;
    dataCompra: string;
    id: number;
    itens: ItemModel[];
    recebebida: string;
    vendedor: string;
}
