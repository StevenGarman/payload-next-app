// src/components/blocks/NewFormBlock.tsx
"use client";

import type { Page } from "@/payload-types";
import React, { useState } from "react";

type FormBlockType = Extract<Page["layout"][number], { blockType: "newform" }>;

type FormState = { loading: boolean; error: string | null; success: boolean };

export default function NewFormBlock({ block }: { block: FormBlockType }) {
  const { heading, form } = block as any;

  const [state, setState] = useState<FormState>({
    loading: false,
    error: null,
    success: false,
  });

  if (!(form && typeof form === "object")) return null;

  const fields: any[] = Array.isArray(form.fields) ? form.fields : [];
  const submitLabel: string = form.submitButtonLabel || "Submit";

async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();

  // Capture the form element BEFORE any await
  const formEl = e.currentTarget; // HTMLFormElement

  if (!block.form || typeof block.form !== "object") return;

  setState({ loading: true, error: null, success: false });

  try {
    const fd = new FormData(formEl);
    const dataObj = Object.fromEntries(fd.entries());
    const submissionData = Object.entries(dataObj).map(([field, value]) => ({
      field,
      value: value as string, // TS: FormData value can be string | File
    }));

    const formId =
      typeof block.form.id === "string" || typeof block.form.id === "number"
        ? block.form.id
        : (block.form?.id as unknown as string);

    const res = await fetch("/api/form-submissions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ form: formId, submissionData }),
    });

    if (!res.ok) {
      const msg = await res.text();
      throw new Error(msg || "Failed to submit form");
    }

    // Use the captured form element, not e.currentTarget
    formEl.reset();

    setState({ loading: false, error: null, success: true });
  } catch (err: any) {
    setState({ loading: false, error: err?.message || "Something went wrong", success: false });
    console.error("[NewFormBlock] submit error:", err);
  }
}


  return (
    <div className="py-20">
      {/* Optional: filter to a specific form name
         {form.title !== "New-Form-2" ? null : (...) } */}
      <div className="max-w-lg mx-auto bg-white rounded-xl shadow-md p-8 space-y-6">
        {heading && (
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{heading}</h1>
        )}

        {state.success && (
          <div className="rounded-lg bg-green-50 text-green-800 text-sm px-4 py-3">
            Thanks! We’ve received your submission.
          </div>
        )}
        {state.error && (
          <div className="rounded-lg bg-red-50 text-red-700 text-sm px-4 py-3">
            {state.error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {fields.map((field: any) => (
            <div key={field.name} className="flex flex-col gap-2">
              {field.label && (
                <label
                  htmlFor={field.name}
                  className="text-sm font-medium text-gray-700"
                >
                  {field.label}{" "}
                  {field.required && <span className="text-red-600">*</span>}
                </label>
              )}

              {field.type === "textarea" ? (
                <textarea
                  id={field.name}
                  name={field.name}
                  placeholder={field.placeholder || field.label}
                  required={!!field.required}
                  rows={4}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm
                             focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400
                             placeholder-gray-400 transition"
                />
              ) : field.type === "checkbox" ? (
                <label className="inline-flex items-center gap-2 text-sm text-gray-800">
                  <input
                    id={field.name}
                    name={field.name}
                    type="checkbox"
                    className="rounded border-gray-300"
                  />
                  {field.label ?? field.name}
                </label>
              ) : (
                <input
                  id={field.name}
                  type={field.type || "text"}
                  name={field.name}
                  placeholder={field.placeholder || field.label}
                  required={!!field.required}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm
                             focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400
                             placeholder-gray-400 transition"
                />
              )}
            </div>
          ))}

          <button
            type="submit"
            disabled={state.loading}
            className="w-full inline-flex justify-center items-center 
                       bg-indigo-600 text-white font-medium px-5 py-2.5 rounded-lg
                       shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 
                       focus:ring-indigo-500 focus:ring-offset-1 transition disabled:opacity-60"
          >
            {state.loading ? "Submitting…" : submitLabel}
          </button>
        </form>
      </div>
    </div>
  );
}
