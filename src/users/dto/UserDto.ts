export interface UserDTO {
  id?: number
  nombre: string
  apellido: string
  email: string
  direccion: string
  codigoPostal: number
  telefono?: string | null
  fechaNacimiento?: Date | null
}