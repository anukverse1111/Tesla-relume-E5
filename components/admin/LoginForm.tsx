"use client";

import { useActionState } from "react";

import { signIn, type FormState } from "@/app/admin/actions";

import { Alert, buttonClass, inputClass } from "./ui";

export function LoginForm() {
  const [state, action, pending] = useActionState<FormState, FormData>(signIn, {});

  return (
    <form action={action} className="flex flex-col gap-5 rounded-card bg-white p-6 md:p-8">
      {state.error && <Alert>{state.error}</Alert>}

      <label className="flex flex-col gap-2">
        <span className="text-small font-medium">Имэйл</span>
        <input
          type="email"
          name="email"
          required
          autoComplete="email"
          defaultValue={state.values?.email}
          className={inputClass}
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-small font-medium">Нууц үг</span>
        <input type="password" name="password" required autoComplete="current-password" className={inputClass} />
      </label>

      <button type="submit" disabled={pending} className={buttonClass.primary}>
        {pending ? "Нэвтэрч байна…" : "Нэвтрэх"}
      </button>
    </form>
  );
}
