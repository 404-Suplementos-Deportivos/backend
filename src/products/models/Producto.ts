import { Categoria } from "./Categoria";
import { Subcategoria } from "./Subcategoria";

export interface Producto {
  id?: number;
  nombre: string;
  descripcion: string;
  urlImagen: string;
  idCategoria: number;
  idSubCategoria: number;
  precioLista: number;
  stock: number;
  stockMinimo: number;
  categoria?: Categoria;
  subcategoria?: Subcategoria;
}
