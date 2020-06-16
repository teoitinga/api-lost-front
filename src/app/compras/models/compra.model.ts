import { ItemModel } from './item.model';
export interface CompraModel {
    cliente: string;
    dataCompra: Date;
    id: number;
    itens: ItemModel[];
    recebebida: string;
    vendedor: string;
}
