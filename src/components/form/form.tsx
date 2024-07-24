"use client";
import { Input, Textarea } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { createContactForm } from "@/app/actions/actions";
import { useFormState } from "react-dom";
import SubmitButton from "./custom-submit-button";

type Inputs = {
  rut: string;
  name: string;
  email: string;
  cel: string;
  message: string;
};

const formInputs = [
  { name: "rut", title: "Rut" },
  { name: "name", title: "Nombre" },
  { name: "email", title: "Email" },
  { name: "cel", title: "Teléfono" },
];

export default function PostsForm() {
  const [state, formAction] = useFormState(createContactForm, null);

  const router = useRouter();

  useEffect(() => {
    const message = state?.message || null;
    if (message != null) {
      if (state?.ok) {
        router.push("/");
        toast.success(message);
      } else {
        toast.error(message);
      }
    }
  }, [state]);

  // separate errors messages if more than one
  const getErrorMessage = (field: keyof Inputs) => {
    const error = state?.errors?.[field];
    return error
      ? Array.isArray(error)
        ? error.map((e) => e).join(" - ")
        : error
      : undefined;
  };
  return (
    <section className="flex flex-col gap-7">
      <h2 className="font-heading text-2xl font-bold sm:text-4xl md:text-[50px] md:leading-[60px]">
        Formulario de contacto
      </h2>
      <form action={formAction} className="flex flex-col gap-5">
        {formInputs.map((inputs, index) => (
          <Input
            key={index}
            label={`${inputs.title}`}
            id={`${inputs.name}`}
            name={`${inputs.name}`}
            color="secondary"
            variant="bordered"
            autoComplete={inputs.name}
            type={inputs.name == "cel" ? "number" : "text"}
            isInvalid={!!state?.errors?.[inputs.name as keyof Inputs]}
            //errorMessage={state?.errors?.[inputs.name as keyof Inputs]}
            errorMessage={getErrorMessage(inputs.name as keyof Inputs)}
          />
        ))}

        <Textarea
          label="Mensaje"
          name="message"
          color="secondary"
          variant="bordered"
          isInvalid={!!state?.errors?.message}
          errorMessage={state?.errors?.message}
        />
        <SubmitButton />
      </form>
    </section>
  );
}
