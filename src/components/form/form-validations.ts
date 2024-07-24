import Fn from "@/logical/run-validator";
import { z } from "zod";

export const formSchema = z.object({
  rut: z
    .string()
    .trim()
    .min(10, {
      message: "El rut debe llevar el guión",
    }).transform(run => Fn.sanitizeRut(run))
    .refine(run => Fn.validaRut(run), {message: "Rut inválido"}),
  name: z
    .string()
    .trim()
    .min(3, {
      message: "El nombre debe tener al menos 3 caracteres",
    })
    .max(200, {
      message: "El el nombre debe tener menos de 200 caracteres",
    }),
  email: z
    .string()
    .trim()
    .email({message: "Email no válido"})
    .min(5, {
      message: "El email debe tener al menos 5 caracteres",
    })
    .max(100, "El email no puede tener más de 100 caracteres"),
  cel: z
    .string()
    .trim()
    .min(9, {
      message: "El teléfono debe tener al menos 9 caracteres",
    })
    .max(10, "El teléfono no puede tener más de 10 caracteres"),
  message: z
    .string()
    .trim()
    .min(15, {
      message: "El mensaje debe tener al menos 15 caracteres",
    })
    .max(1000, "El mensaje no puede tener más de 1000 caracteres"),
});
