import { Producto } from "src/products/models/Producto";

export interface Cart {
  id: number;
  idUsuario: number;
  productos: Producto[];
}