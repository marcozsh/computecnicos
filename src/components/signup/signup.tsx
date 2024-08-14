"use client";
import { signUp } from "@/app/actions/actions";
import { Input } from "@nextui-org/react";
import { useFormState } from "react-dom";
import SubmitButton from "../form/custom-submit-button";

export default function SignUpPage() {
  const [state, formAction] = useFormState(signUp, null);

  return (
    <>
      <section className="flex flex-col gap-6 lg:w-[600px]">
        <h2 className="font-heading text-center text-2xl font-bold sm:text-4xl md:text-[50px] md:leading-[60px]">
          Computecnicos - Registro
        </h2>
        <form action={formAction} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <Input
              label="Nombre"
              color="secondary"
              variant="bordered"
              id="name"
              name="name"
              isInvalid={!!state?.errors?.name}
            />
            {state?.errors?.name && (
              <p className="text-sm text-danger">{state.errors.name}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Input
              label="Email"
              color="secondary"
              variant="bordered"
              id="email"
              name="email"
              isInvalid={!!state?.errors?.email}
            />
            {state?.errors?.email && (
              <div className="text-sm text-danger">
                <ul>
                  {state.errors.email.map((error) => (
                    <li key={error}>- {error}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Input
              label="Contraseña"
              color="secondary"
              variant="bordered"
              id="password"
	      name="password"
	      type="password"
              isInvalid={!!state?.errors?.password}
            />
            {state?.errors?.password && (
              <div className="flex flex-col text-sm text-danger">
                <p>La contraseña debe tener:</p>
                <ul>
                  {state.errors.password.map((error) => (
                    <li key={error}>- {error}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
	  {state?.bd_error && (
		<p className="text-sm text-danger">{state.bd_error}</p>
	  )}
          <SubmitButton
            notPendingText="Registrarse"
            pendingText="Registrando"
          />
        </form>
      </section>
    </>
  );
}
