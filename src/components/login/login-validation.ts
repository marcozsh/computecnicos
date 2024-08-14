import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({required_error: "Debe ingresar un email"})
    .trim()
    .email({message: "Email no válido"})
    .min(5, {
      message: "El email debe tener al menos 5 caracteres",
    }),
  password: z
    .string({required_error: "Favor ingresar la contraseña"})
    .trim(),
});
