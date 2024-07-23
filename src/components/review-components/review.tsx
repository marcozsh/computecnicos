"use client";
import { Input, Textarea } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import toast from "react-hot-toast";
import { useFormState } from "react-dom";
import { createValoritation } from "@/app/actions/actions";
import SubmitButton from "../form/custom-submit-button";


export default function ReviewForm() {
  //rating states
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number>(0);

  //form states
  const [state, formAction] = useFormState(createValoritation, null);

  const router = useRouter();

  useEffect(() => {
    try {
      if (state?.ok) {
        router.push(`/`);
        toast.success(state.message);
      }else if (state?.message) {
        toast.error(state.message);
      }

    } catch {}
  }, [state]);

  return (
    <section className="flex flex-col gap-7">
      <h2 className="font-heading text-2xl font-bold sm:text-4xl md:text-[50px] md:leading-[60px] pb-10">
        Valora el trabajo realizado
      </h2>
      <form action={formAction} className="flex flex-col gap-5">
        <Input
          label="Nombre"
          color="secondary"
          variant="bordered"
          id="name"
          name="name"
          isInvalid={!!state?.errors?.name}
          errorMessage={state?.errors?.name}
        />

        <Textarea
          label="Comenta tu experciencia con nuestro servicio"
          color="secondary"
          variant="bordered"
          id="message"
          name="message"
          isInvalid={!!state?.errors?.message}
          errorMessage={state?.errors?.message}
        />

        <div className="flex flex-col gap-2 text-center">
          <div className="flex flex-row justify-center gap-6">
            {[...Array(5)].map((_, stars) => {
              const starRating = stars + 1;
              return (
                <label key={starRating}>
                  <input
                    type="radio"
                    onClick={() => setRating(starRating)}
                    value={starRating}
                    id="stars"
                    name="stars"
                    className="hidden"
                  />
                  <FaStar
                    size={50}
                    className={`cursor-pointer hover:text-secondary hover:transition-colors hover:duration-300 hover:ease-in-out ${
                      starRating <= (hover || rating)
                        ? "text-secondary"
                        : "text-gray"
                    }`}
                    onMouseEnter={() => setHover(starRating)}
                    onMouseLeave={() => setHover(rating)}
                  />
                </label>
              );
            })}
          </div>
          <p className="text-danger">
            {state?.errors?.stars ? "Debe marcar almenos 1 estrella" : ""}
          </p>
        </div>
        <SubmitButton />
      </form>
    </section>
  );
}
