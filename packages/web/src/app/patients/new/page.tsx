import { PatientForm } from "@/components/patients/PatientForm";

export default function NewPatientPage() {
  return (
    <main className="mx-auto max-w-xl px-4 py-10">
      <h1 className="text-2xl font-bold">Nuevo paciente</h1>
      <div className="mt-6">
        <PatientForm />
      </div>
    </main>
  );
}
