import { z } from "zod";

export const signUpSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'El nombre debe tener al menos 2 caracteres' })
    .trim(),
  email: z
    .string({required_error: "Debe ingresar un email"})
    .trim()
    .email({message: "Email no válido"})
    .min(5, {
      message: "El email debe tener al menos 5 caracteres",
    })
    .max(100, "El email no puede tener más de 100 caracteres"),
  password: z
    .string()
    .min(8, { message: 'La contraseña debe ser de almenos 8 caracteres' })
    .regex(/[a-zA-Z]/, { message: 'La contraseña debe tener al menos 1 letra' })
    .regex(/[0-9]/, { message: 'La contraseña debe tener al menos 1 número' })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'La contraseña debe tener al menos 1 carácter especial',
    })
    .trim(),
});
