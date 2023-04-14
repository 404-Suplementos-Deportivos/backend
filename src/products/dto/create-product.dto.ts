export interface CreateProductDto {
  nombre: string;
  descripcion: string;
  urlImagen: string;
  idCategoria: number;
  idSubCategoria: number;
  precioLista: number;
  stock: number;
  stockMinimo: number;
}
