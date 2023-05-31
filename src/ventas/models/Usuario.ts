export interface Usuario {
  id?: number;
  nombre: string;
  apellido: string;
  email: string;
  direccion: string;
  codigoPostal: number;
  telefono: string | null;
  fechaNacimiento: string | null;
  estado: boolean;
}