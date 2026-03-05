import { validatePatient } from "./validation";
import {
  findAllPatients,
  searchPatientsByName,
  findPatientById,
  insertPatient,
  updatePatient,
  deletePatient,
} from "./repository";
import type { CreatePatientInput, UpdatePatientInput } from "./types";

export async function listPatients(search?: string) {
  if (search?.trim()) {
    return searchPatientsByName(search.trim());
  }
  return findAllPatients();
}

export async function getPatient(id: string) {
  const patient = await findPatientById(id);
  if (!patient) throw new Error("Paciente no encontrado");
  return patient;
}

export async function createPatient(input: CreatePatientInput) {
  const errors = validatePatient(input);
  if (errors.length > 0) {
    return { success: false as const, errors };
  }
  const patient = await insertPatient(input);
  return { success: true as const, patient };
}

export async function editPatient(id: string, input: UpdatePatientInput) {
  const merged = { ...input } as CreatePatientInput;
  const existing = await findPatientById(id);
  if (!existing) throw new Error("Paciente no encontrado");

  const full: CreatePatientInput = {
    fullName: merged.fullName ?? existing.fullName,
    email: merged.email ?? existing.email,
    phone: merged.phone ?? existing.phone,
    notes: merged.notes ?? existing.notes ?? undefined,
  };

  const errors = validatePatient(full);
  if (errors.length > 0) {
    return { success: false as const, errors };
  }

  const patient = await updatePatient(id, input);
  return { success: true as const, patient };
}

export async function removePatient(id: string) {
  const patient = await deletePatient(id);
  if (!patient) throw new Error("Paciente no encontrado");
  return patient;
}
