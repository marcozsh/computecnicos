"use client";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Button, Input, Textarea } from "@nextui-org/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { reviewFormSchema } from "./review-validations";
import { FaStar } from "react-icons/fa";
import toast from "react-hot-toast";

type ReviewInputs = {
  nombre: string;
  message: string;
};

export default function ReviewForm() {
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ReviewInputs>({ resolver: zodResolver(reviewFormSchema) });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [rating, setRating] = useState<number>(0);

  const [hover, setHover] = useState<number>(0);

  const router = useRouter();

  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

  const onSubmit: SubmitHandler<ReviewInputs> = async (data) => {
    setIsSubmitting(true);
    try {
      console.log(data, rating);
      //const returnData = await postData(data);
      await sleep(5000);
      toast.success("¡Valoración Enviada!");
      router.push(`/`);
    } catch {
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="flex flex-col gap-7">
      <h2 className="font-heading text-2xl font-bold sm:text-4xl md:text-[50px] md:leading-[60px] pb-10">
        Valora el trabajo realizado
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <Controller
          control={control}
          name="nombre"
          render={({ field }) => (
            <Input
              label="Nombre"
              color="secondary"
              variant="bordered"
              //startContent={<FiUser />}
              isInvalid={!!errors?.nombre}
              errorMessage={errors.nombre?.message}
              {...field}
            />
          )}
        />

        <Controller
          control={control}
          name="message"
          render={({ field }) => (
            <Textarea
              label="Comenta tu experciencia con nuestro servicio"
              color="secondary"
              variant="bordered"
              //autoComplete="email"
              //startContent="hola"
              isInvalid={!!errors?.message}
              errorMessage={errors.message?.message}
              {...field}
            />
          )}
        />
        <div className="flex flex-row justify-center gap-6">
          {[...Array(5)].map((_, stars) => {
            const starRating = stars + 1;
            return (
              <label key={starRating}>
                <FaStar
                  size={50}
                  className={`cursor-pointer hover:text-secondary hover:transition-colors hover:duration-300 hover:ease-in-out ${
                    starRating <= (hover || rating)
                      ? "text-secondary"
                      : "text-gray"
                  }`}
                  onClick={() => setRating(starRating)}
                  onMouseEnter={() => setHover(starRating)}
                  onMouseLeave={() => setHover(rating)}
                />
              </label>
            );
          })}
        </div>
        {isSubmitting ? (
          <Button
            type="submit"
            className="w-full rounded-xl"
            color="secondary"
            isLoading
          >
            Enviando
          </Button>
        ) : (
          <Button type="submit" className="w-full rounded-xl" color="secondary">
            Ingresar
          </Button>
        )}
      </form>
    </section>
  );
}
