import { notFound } from "next/navigation";
import { findPatientById } from "@/lib/patients/repository";
import { PatientForm } from "@/components/patients/PatientForm";

interface EditPatientPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPatientPage({
  params,
}: EditPatientPageProps) {
  const { id } = await params;
  const patient = await findPatientById(id);
  if (!patient) notFound();

  return (
    <main className="mx-auto max-w-xl px-4 py-10">
      <h1 className="text-2xl font-bold">Editar paciente</h1>
      <div className="mt-6">
        <PatientForm patient={patient} />
      </div>
    </main>
  );
}
