import { z } from 'zod'

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

const createUserSchema = z.object({
  nombre: z.string().nonempty('El nombre no puede estar vacío'),
  apellido: z.string().nonempty('El apellido no puede estar vacío'),
  email: z.string().email('El email no es válido'),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
  direccion: z.string().nonempty('La dirección no puede estar vacía'),
  codigoPostal: z.number({
    required_error: "Codigo postal es requerido",
    invalid_type_error: "Codigo postal debe ser un número",
  }).int().min(0, 'El código postal no puede ser negativo'),
  telefono: z.string({
    invalid_type_error: "El teléfono debe tener el formato +54 11 1234-5678",
  }).optional(),
  fechaNacimiento: z.date({
    invalid_type_error: "Formato de fecha inválido",
  }).optional(),
})
type CreateUserSchemaType = z.infer<typeof createUserSchema>;
export { createUserSchema, CreateUserSchemaType }