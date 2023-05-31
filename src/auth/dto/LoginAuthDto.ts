import { z } from 'zod'

export interface LoginAuthDto {
  id?: number
  nombre?: string
  email: string
  password: string
  cuenta_confirmada?: boolean
  roles?: {
    nombre: string
  },
  estado?: boolean
}

const loginAuthSchema = z.object({
  email: z.string().email('El email no es válido'),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
})
type LoginSchemaType = z.infer<typeof loginAuthSchema>;
export { loginAuthSchema, LoginSchemaType }