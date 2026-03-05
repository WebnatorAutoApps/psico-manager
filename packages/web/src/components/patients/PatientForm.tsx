"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Patient } from "@/lib/patients/types";
import type { ValidationError } from "@/lib/patients/validation";

interface PatientFormProps {
  patient?: Patient;
}

export function PatientForm({ patient }: PatientFormProps) {
  const router = useRouter();
  const [fullName, setFullName] = useState(patient?.fullName ?? "");
  const [email, setEmail] = useState(patient?.email ?? "");
  const [phone, setPhone] = useState(patient?.phone ?? "");
  const [notes, setNotes] = useState(patient?.notes ?? "");
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const isEditing = !!patient;

  function errorFor(field: string) {
    return errors.find((e) => e.field === field)?.message;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setErrors([]);

    const body = { fullName, email, phone, notes: notes || undefined };
    const url = isEditing ? `/api/patients/${patient.id}` : "/api/patients";
    const method = isEditing ? "PATCH" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const data = await res.json();
      setErrors(data.errors ?? [{ field: "", message: "Error inesperado" }]);
      setSubmitting(false);
      return;
    }

    router.push("/patients");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Field
        label="Nombre completo"
        value={fullName}
        onChange={setFullName}
        error={errorFor("fullName")}
        required
      />
      <Field
        label="Email"
        type="email"
        value={email}
        onChange={setEmail}
        error={errorFor("email")}
        required
      />
      <Field
        label="Telefono"
        type="tel"
        value={phone}
        onChange={setPhone}
        error={errorFor("phone")}
        required
      />
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Notas
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
        />
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={submitting}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {isEditing ? "Guardar cambios" : "Crear paciente"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  error,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
