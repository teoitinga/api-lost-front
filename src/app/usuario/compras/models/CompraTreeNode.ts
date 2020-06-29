import { FileNode } from './dash-compra-model';

export class CompraTreeNodeImpl {
  constructor(
    clienteNome: string, 
    codigo: number, 
    dataCompra: string, 
    dataPagamento: string, 
    itemDesconto: number, 
    itemDescription: string, 
    itemId: number, 
    itemQtd: number, 
    itemUnitvalue: number, 
    recebedor: string, 
    valorCompra: number, 
    vendedor: string) { }
  name?: string;
  type?: string;
  children?: FileNode[];
}

export interface CompraTreeNodeFull {
    clienteNome: string;
    codigo: number;
    dataCompra: string;
    dataPagamento: string;
    itemDesconto: number;
    itemDescription: string;
    itemId: number;
    itemQtd: number;
    itemUnitvalue: number;
    recebedor: string;
    valorCompra: number;
    vendedor: string;
    name?: string;
    type?: string;
    children?: FileNode[];
}
export interface CompraTreeNode {
  codigo: number;
  dataCompra: string;
  dataPagamento?: any;
  recebedor: string;
  vendedor: string;
  clienteNome: string;
  valorCompra: number;
  itens: ItemNode[];
}

export interface ItemNode {
  id: number;
  description: string;
  unitvalue: number;
  qtd: number;
  desconto: number;
}
