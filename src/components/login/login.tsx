"use client";
import { login } from "@/app/actions/actions";
import { Button, Input } from "@nextui-org/react";
import { useFormState } from "react-dom";
import SubmitButton from "../form/custom-submit-button";
import Image from "next/image";
import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";
import { redirect } from "next/navigation";

export default function LoginPage() {
  const [state, formAction] = useFormState(login, null);

  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      redirect("/");
    }
  });

  return (
    <>
      <section className="flex flex-col gap-6 lg:w-[600px]">
        <h2 className="font-heading text-2xl text-center font-bold sm:text-4xl md:text-[50px] md:leading-[60px]">
          Computecnicos - Login
        </h2>
        <form action={formAction} className="flex flex-col gap-6">
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
          <SubmitButton
            notPendingText="Iniciar sesión"
            pendingText="Iniciando sesión"
          />
        </form>
        <div>
          <Button
            className="flex flex-row justify-center gap-2 mt-5 rounded-full cursor-pointer text-center bg-white text-[#1f1f1f] border border-solid border-black p-2 w-52"
            onClick={() => signIn("google", { callbackUrl: "/" })}
          >
            <Image src="/google.svg" width="20" height="20" alt="google icon" />
            Sign up With Google
          </Button>
        </div>
      </section>
    </>
  );
}
