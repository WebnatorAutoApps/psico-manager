import Link from "next/link";
import type { Patient } from "@/lib/patients/types";

interface PatientListProps {
  patients: Patient[];
}

export function PatientList({ patients }: PatientListProps) {
  if (patients.length === 0) {
    return (
      <p className="py-8 text-center text-gray-500">
        No se encontraron pacientes.
      </p>
    );
  }

  return (
    <ul className="divide-y divide-gray-200 rounded-lg border border-gray-200">
      {patients.map((patient) => (
        <li key={patient.id}>
          <Link
            href={`/patients/${patient.id}`}
            className="flex items-center justify-between px-4 py-3 hover:bg-gray-50"
          >
            <div>
              <p className="font-medium text-gray-900">{patient.fullName}</p>
              <p className="text-sm text-gray-500">{patient.email}</p>
            </div>
            <span className="text-sm text-gray-400">{patient.phone}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
