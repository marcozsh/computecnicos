"use server";
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
	  console.log(reviewForm.error.flatten().fieldErrors)
    return {
      errors: reviewForm.error.flatten().fieldErrors,
    }
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
  }
}
