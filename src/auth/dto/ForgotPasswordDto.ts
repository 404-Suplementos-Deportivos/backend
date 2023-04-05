import { type } from 'os';
import z from 'zod';

export interface ForgotPassDto {
  email: string;
}

const forgotPassSchema = z.object({
  email: z.string().email('El email no es válido'),
});
type ForgotPassSchemaType = z.infer<typeof forgotPassSchema>;
export { forgotPassSchema, ForgotPassSchemaType };