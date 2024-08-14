import { Button } from "@nextui-org/react";

import { useFormStatus } from "react-dom";

type SubmitButtonType = {
  notPendingText: string;
  pendingText: string;
};

export default function SubmitButton({
  notPendingText,
  pendingText,
}: SubmitButtonType) {
  const { pending } = useFormStatus();
  return pending ? (
    <Button
      type="submit"
      className="w-full rounded-xl"
      color="secondary"
      isLoading
    >
      {pendingText}
    </Button>
  ) : (
    <Button type="submit" className="w-full rounded-xl" color="secondary">
      {notPendingText}
    </Button>
  );
}
