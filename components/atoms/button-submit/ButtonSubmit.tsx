'use client';

import { useFormStatus } from "react-dom";

export interface IButtonSubmitProps {
  buttonName: string;
}

export default function ButtonSubmit({ buttonName }: IButtonSubmitProps) {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending}>
      {pending ? 'Submitting...' : buttonName}
    </button>
  );
}
