
import { Component } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';
import { files } from './example-data';
import { teenfiles } from '../../models/dash-data';
import {NestedTreeControl} from '@angular/cdk/tree';

import {MatTreeNestedDataSource} from '@angular/material/tree';
import { CompraTreeNode } from '../../models/CompraTreeNode';
/** File node data with possible child nodes. */
export interface FileNode {
  name: string;
  type: string;
  children?: FileNode[];
}
/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface FoodNode {
  name: string;
  children?: FoodNode[];
}
/**
 * Flattened tree node that has been created from a FileNode through the flattener. Flattened
 * nodes include level index and whether they can be expanded or not.
 */

export interface FlatTreeNode {
  name: string;
  type: string;
  level: number;
  expandable: boolean;
}

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent { 
  treeControl = new NestedTreeControl<FoodNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<FoodNode>();

  constructor() { 

    this.dataSource.data = TREE_DATA;
    const datafile: CompraTreeNode[] = teenfiles;
  }

  hasChild = (_: number, node: FoodNode) => (!!node.children && node.children.length > 0)
  transformaNode( compra: CompraTreeNode, cur ){
    compra.clienteNome;
  }
}
const TREE_DATA: FoodNode[] = [
  {
    name: 'Fruit',
    children: [
      {name: 'Apple'},
      {name: 'Banana'},
      {name: 'Fruit loops'},
    ]
  }, {
    name: 'Vegetables',
    children: [
      {
        name: 'Green',
      }, {
        name: 'Orange',
      },
    ]
  },
];