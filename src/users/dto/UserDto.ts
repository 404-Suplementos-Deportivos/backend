export interface UserDTO {
  id?: number
  nombre: string
  apellido: string
  email: string
  password?: string
  direccion: string
  codigoPostal: number
  telefono?: string | null
  fechaNacimiento?: string | null
  idRol?: number;
}