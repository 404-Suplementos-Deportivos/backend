export interface CartDto {
  idUsuario?: number,
  productos: [
    {
      idProducto: number,
      cantidad: number
    }
  ]
}