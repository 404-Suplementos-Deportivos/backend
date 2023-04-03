export interface CreateUserDto {
  nombre: string
  apellido: string
  email: string
  password: string
  direccion: string
  codigoPostal: number
  telefono?: string
  fechaNacimiento?: Date
}
