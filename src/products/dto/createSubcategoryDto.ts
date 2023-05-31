export interface CreateSubcategoryDto {
  id?: number;
  nombre: string;
  descripcion: string;
  idCategoria: number;
  estado?: boolean;
}