import { eq, ilike } from "drizzle-orm";
import { db } from "@/lib/db";
import { patients } from "@/lib/db/schema";
import type { CreatePatientInput, UpdatePatientInput } from "./types";

export async function findAllPatients() {
  return db.select().from(patients).orderBy(patients.fullName);
}

export async function searchPatientsByName(query: string) {
  return db
    .select()
    .from(patients)
    .where(ilike(patients.fullName, `%${query}%`))
    .orderBy(patients.fullName);
}

export async function findPatientById(id: string) {
  const rows = await db.select().from(patients).where(eq(patients.id, id));
  return rows[0] ?? null;
}

export async function insertPatient(input: CreatePatientInput) {
  const rows = await db
    .insert(patients)
    .values({
      fullName: input.fullName.trim(),
      email: input.email.trim(),
      phone: input.phone.trim(),
      notes: input.notes?.trim() || null,
    })
    .returning();
  return rows[0];
}

export async function updatePatient(id: string, input: UpdatePatientInput) {
  const values: Record<string, unknown> = { updatedAt: new Date() };
  if (input.fullName !== undefined) values.fullName = input.fullName.trim();
  if (input.email !== undefined) values.email = input.email.trim();
  if (input.phone !== undefined) values.phone = input.phone.trim();
  if (input.notes !== undefined) values.notes = input.notes?.trim() || null;

  const rows = await db
    .update(patients)
    .set(values)
    .where(eq(patients.id, id))
    .returning();
  return rows[0] ?? null;
}

export async function deletePatient(id: string) {
  const rows = await db
    .delete(patients)
    .where(eq(patients.id, id))
    .returning();
  return rows[0] ?? null;
}
