import Link from "next/link";
import { notFound } from "next/navigation";
import { findPatientById } from "@/lib/patients/repository";
import { DeletePatientButton } from "@/components/patients/DeletePatientButton";

interface PatientDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function PatientDetailPage({
  params,
}: PatientDetailPageProps) {
  const { id } = await params;
  const patient = await findPatientById(id);
  if (!patient) notFound();

  return (
    <main className="mx-auto max-w-xl px-4 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{patient.fullName}</h1>
        <Link
          href={`/patients/${patient.id}/edit`}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Editar
        </Link>
      </div>

      <dl className="mt-6 space-y-4">
        <DetailRow label="Email" value={patient.email} />
        <DetailRow label="Telefono" value={patient.phone} />
        <DetailRow label="Notas" value={patient.notes ?? "Sin notas"} />
      </dl>

      <div className="mt-8">
        <DeletePatientButton
          patientId={patient.id}
          patientName={patient.fullName}
        />
      </div>

      <div className="mt-6">
        <Link href="/patients" className="text-sm text-blue-600 hover:underline">
          Volver a la lista
        </Link>
      </div>
    </main>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-sm font-medium text-gray-500">{label}</dt>
      <dd className="mt-1 text-gray-900">{value}</dd>
    </div>
  );
}
