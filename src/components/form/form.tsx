"use client";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Button, Input, Textarea } from "@nextui-org/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { formSchema } from "./form-validations";
import { useState } from "react";
import toast from "react-hot-toast";

type Inputs = {
  rut: string;
  nombre: string;
  mail: string;
  cel: string;
  message: string;
};

const formInputs = [
  { name: "rut", title: "Rut" },
  { name: "nombre", title: "Nombre" },
  { name: "mail", title: "Email" },
  { name: "cel", title: "Teléfono" },
];

export default function PostsForm() {
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({ resolver: zodResolver(formSchema) });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const router = useRouter();

  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsSubmitting(true);
    try {
      console.log(data);
      //const returnData = await postData(data);
      await sleep(5000);
      toast.success("¡Mensaje enviado!");
      router.push(`/`);
    } catch {
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="flex flex-col gap-7">
      <h2 className="font-heading text-2xl font-bold sm:text-4xl md:text-[50px] md:leading-[60px]">
        Formulario de contacto
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        {formInputs.map((inputs, index) => (
          <Controller
            key={index}
            control={control}
            name={inputs.name as keyof Inputs}
            render={({ field }) => (
              <Input
                label={inputs.title}
                color="secondary"
                variant="bordered"
                autoComplete={inputs.name}
                type={inputs.name == "cel" ? "number" : "text"}
                //startContent={<FiUser />}
                isInvalid={!!errors?.[inputs.name as keyof Inputs]}
                errorMessage={errors[inputs.name as keyof Inputs]?.message}
                {...field}
              />
            )}
          />
        ))}

        <Controller
          control={control}
          name="message"
          render={({ field }) => (
            <Textarea
              label="Mensaje"
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
