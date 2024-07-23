
import { Button } from "@nextui-org/react";

import {  useFormStatus } from "react-dom";

export default function SubmitButton() {
  const { pending } = useFormStatus();
  return pending ? (
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
  );
}
