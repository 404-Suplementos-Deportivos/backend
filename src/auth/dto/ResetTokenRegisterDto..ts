import { z } from 'zod';

export interface ResetTokenRegisterDto {
  email: string;
}

const resetTokenRegisterSchema = z.object({
  email: z.string().email('Debe ser un email válido'),
});
type ResetTokenRegisterSchemaType = z.infer<typeof resetTokenRegisterSchema>;
export { resetTokenRegisterSchema, ResetTokenRegisterSchemaType };