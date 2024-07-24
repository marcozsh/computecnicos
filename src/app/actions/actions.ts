"use server";
import { formSchema } from "@/components/form/form-validations";
import { reviewFormSchema } from "@/components/review-components/review-validations";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

export async function createValoritation(prevState: any, formData: FormData) {
  const reviewForm = reviewFormSchema.safeParse({
    name: formData.get("name"),
    message: formData.get("message"),
    stars: formData.get("stars")?.toString(),
  });
  if (!reviewForm.success) {
    console.log(reviewForm.error.flatten().fieldErrors);
    return {
      errors: reviewForm.error.flatten().fieldErrors,
    };
  }

  //const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
  //await sleep(3000);
  try {
    await sql`
    INSERT INTO valorations (name, message, stars) 
    VALUES (${reviewForm.data.name}, ${reviewForm.data.message}, ${reviewForm.data.stars})`;
    revalidatePath("/");
    return { ok: true, message: "Mensaje enviado" };
  } catch (err) {
    return { ok: false, message: "Error al enviar el mensaje" };
  }
}

export async function createContactForm(prevState: any, formData: FormData) {
  const contactForm = formSchema.safeParse({
    rut: formData.get("rut"),
    name: formData.get("name"),
    email: formData.get("email"),
    cel: formData.get("cel"),
    message: formData.get("message"),
  });
  console.log(contactForm);
  if (!contactForm.success) {
  console.log(contactForm.error.flatten().fieldErrors);
    return {
      errors: contactForm.error.flatten().fieldErrors,
    };
  }
  try {
    await sql`
	  INSERT INTO clients (rut, name, email, cel, message)
	  VALUES (${contactForm.data.rut}, ${contactForm.data.name},${contactForm.data.email},${contactForm.data.cel},${contactForm.data.message})`;
    return { ok: true, message: "Mensaje enviado" };
  } catch (err) {
    return { ok: false, message: "Error al enviar el mensaje" };
  }
}
