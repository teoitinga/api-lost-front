import { Item } from './item';
export interface Compra {
    cliente: number;
    dataCompra: Date;
    id: number;
    itens: Item[];
    recebebida: string;
    vendedor: number;
}
