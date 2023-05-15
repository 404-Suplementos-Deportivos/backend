export interface DetalleComprobante {
  id?: number;
  cantidad: number;
  precio: number;
  descuento: number;
  idProducto: number;
  idComprobante: number;
}