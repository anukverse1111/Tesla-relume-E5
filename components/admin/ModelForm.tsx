"use client";

import Link from "next/link";
import { useActionState, useEffect, useState, type ReactNode } from "react";

import type { FormState } from "@/app/admin/actions";
import { logoOptions, type CarModelRow, type LogoKey } from "@/lib/car-model-types";

import { Alert, buttonClass, inputClass } from "./ui";

type ModelFormProps = {
  action: (state: FormState, formData: FormData) => Promise<FormState>;
  model?: CarModelRow;
};

function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-small font-medium">{label}</span>
      {children}
      {hint && <span className="text-small text-black/60">{hint}</span>}
    </label>
  );
}

export function ModelForm({ action, model }: ModelFormProps) {
  const [state, formAction, pending] = useActionState(action, {});
  const [preview, setPreview] = useState<string | null>(null);

  // Алдаа гарвал хэрэглэгчийн бөглөсөн утгыг, эс бөгөөс одоогийн картын утгыг харуулна
  const value = (key: keyof CarModelRow) => state.values?.[key] ?? (model?.[key] == null ? "" : String(model[key]));
  const logo = (state.values?.logo ?? model?.logo ?? "a") as LogoKey;
  const published = state.values ? state.values.is_published === "on" : (model?.is_published ?? true);

  useEffect(() => () => void (preview && URL.revokeObjectURL(preview)), [preview]);

  const imageSrc = preview ?? model?.image_url;

  return (
    <form action={formAction} className="flex flex-col gap-6 rounded-card bg-white p-6 md:p-8">
      {state.error && <Alert>{state.error}</Alert>}

      <Field label="Нэр *">
        <input name="name" required maxLength={80} defaultValue={value("name")} placeholder="Model Y" className={inputClass} />
      </Field>

      <Field label="Тайлбар">
        <input
          name="description"
          maxLength={200}
          defaultValue={value("description")}
          placeholder="Дунд оврын SUV"
          className={inputClass}
        />
      </Field>

      <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
        <Field label="Үнийн бичвэр" hint="Картан дээр яг ингэж харагдана">
          <input
            name="price_text"
            maxLength={120}
            defaultValue={value("price_text")}
            placeholder="Сарын $499-өөс эхлэн лизингээр"
            className={inputClass}
          />
        </Field>
        <Field label="Дүн ($)" hint="Бөглөвөл ард нь ≈ төгрөгөөр гарна">
          <input
            name="price_usd"
            type="number"
            min={0}
            step="0.01"
            inputMode="decimal"
            defaultValue={value("price_usd")}
            placeholder="499"
            className={inputClass}
          />
        </Field>
      </div>

      <Field label="Холбоос" hint="Нэр дээр дарахад очих хуудас. Хоосон байж болно.">
        <input
          name="href"
          defaultValue={value("href")}
          placeholder="/model-y эсвэл https://www.tesla.com/model3"
          pattern="(/|https://).*"
          title="/ эсвэл https://-ээр эхэлнэ"
          className={inputClass}
        />
      </Field>

      <div className="flex flex-col gap-3">
        <Field
          label={model ? "Зураг солих" : "Зураг *"}
          hint="JPG, PNG, WebP эсвэл AVIF, 4MB хүртэл. Хэвтээ, 1216×1120 орчим хэмжээтэй зураг тохиромжтой."
        >
          <input
            name="image"
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif"
            required={!model}
            onChange={(event) => {
              const file = event.target.files?.[0];
              setPreview(file ? URL.createObjectURL(file) : null);
            }}
            className="text-small file:mr-3 file:cursor-pointer file:border-0 file:bg-black-5 file:px-4 file:py-2 file:font-medium"
          />
        </Field>
        {state.error && !model && <p className="text-small text-black/60">Алдаа гарсны дараа зургаа дахин сонгоно уу.</p>}
        {imageSrc && (
          <img src={imageSrc} alt="Сонгосон зураг" className="aspect-[608/560] w-full max-w-[304px] rounded-card object-cover" />
        )}
      </div>

      <fieldset className="flex flex-col gap-2">
        <legend className="mb-2 text-small font-medium">Лого</legend>
        <div className="flex flex-wrap gap-3">
          {(Object.keys(logoOptions) as LogoKey[]).map((key) => (
            <label
              key={key}
              className="flex cursor-pointer items-center gap-3 rounded-card border border-black/15 bg-black p-3 has-checked:outline-2 has-checked:outline-offset-2 has-checked:outline-tesla-red"
            >
              <input type="radio" name="logo" value={key} defaultChecked={logo === key} className="accent-tesla-red" />
              <img src={logoOptions[key]} alt={`Лого ${key.toUpperCase()}`} width={120} height={48} />
            </label>
          ))}
        </div>
      </fieldset>

      <label className="flex cursor-pointer items-center gap-3">
        <input type="checkbox" name="is_published" defaultChecked={published} className="size-4 accent-tesla-red" />
        <span>Сайтад харуулах</span>
      </label>

      <div className="flex flex-wrap gap-3 border-t border-black/10 pt-6">
        <button type="submit" disabled={pending} className={buttonClass.primary}>
          {pending ? "Хадгалж байна…" : "Хадгалах"}
        </button>
        <Link href="/admin" className={buttonClass.secondary}>
          Болих
        </Link>
      </div>
    </form>
  );
}
