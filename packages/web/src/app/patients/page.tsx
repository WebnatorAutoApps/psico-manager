import Link from "next/link";
import { listPatients } from "@/lib/patients/use-cases";
import { PatientList } from "@/components/patients/PatientList";
import { SearchBar } from "@/components/patients/SearchBar";

interface PatientsPageProps {
  searchParams: Promise<{ search?: string }>;
}

export default async function PatientsPage({ searchParams }: PatientsPageProps) {
  const { search } = await searchParams;
  const patients = await listPatients(search);

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Pacientes</h1>
        <Link
          href="/patients/new"
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Nuevo paciente
        </Link>
      </div>

      <div className="mt-6">
        <SearchBar />
      </div>

      <div className="mt-6">
        <PatientList patients={patients} />
      </div>
    </main>
  );
}
