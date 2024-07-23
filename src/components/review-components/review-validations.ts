import { z } from "zod";

export const reviewFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, {
      message: "El nombre debe tener al menos 3 caracteres",
    })
    .max(200, {
      message: "El el nombre debe tener menos de 200 caracteres",
    }),
  message: z
    .string()
    .trim()
    .min(10, {
      message: "El mensaje debe tener al menos 10 caracteres",
    })
    .max(1000, "El mensaje no puede tener más de 1000 caracteres"),
  stars: z
    .string()
    .trim()
    //.refine((stars) => {stars == null ? "0" : stars;}),
});
