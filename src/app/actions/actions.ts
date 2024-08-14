"use server";
import { formSchema } from "@/components/form/form-validations";
import { loginSchema } from "@/components/login/login-validation";
import { reviewFormSchema } from "@/components/review-components/review-validations";
import { signUpSchema } from "@/components/signup/sign-validation";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import * as argon2 from "argon2";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function signUp(prevState: any, formData: FormData) {
  const signUpForm = signUpSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!signUpForm.success) {
    return { errors: signUpForm.error.flatten().fieldErrors };
  }

  try {
    let userValidation =
      await sql`SELECT id FROM public.users WHERE email = ${signUpForm.data.email}`;
    //console.log(userValidation)
    if (userValidation.rowCount != null && userValidation.rowCount > 0) {
      return { bd_error: "El email indicado ya posee una cuenta." };
    }
    let hashedPassword = await argon2.hash(signUpForm.data.password);
    await sql`INSERT INTO public.users (name, email, password) VALUES (${signUpForm.data.name}, ${signUpForm.data.email}, ${hashedPassword})`;
  } catch {
    return { ok: false, message: "Error en el registro" };
  }
  await sleep(3000);
}

export async function login(prevState: any, formData: FormData) {
  const loginForm = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!loginForm.success) {
    return { errors: loginForm.error.flatten().fieldErrors };
  }
  await sleep(3000);
}

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
