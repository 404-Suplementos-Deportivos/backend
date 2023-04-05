import z from 'zod'

export interface RecuperatePassDto {
  password: string;
}

const recuperatePassSchema = z.object({
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres')
})
type RecuperatePassSchemaType = z.infer<typeof recuperatePassSchema>;
export { recuperatePassSchema, RecuperatePassSchemaType }