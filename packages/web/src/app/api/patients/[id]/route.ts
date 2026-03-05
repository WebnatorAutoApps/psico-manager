import { NextRequest, NextResponse } from "next/server";
import { getPatient, editPatient, removePatient } from "@/lib/patients/use-cases";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, { params }: Params) {
  const { id } = await params;
  try {
    const patient = await getPatient(id);
    return NextResponse.json(patient);
  } catch {
    return NextResponse.json({ error: "Paciente no encontrado" }, { status: 404 });
  }
}

export async function PATCH(request: NextRequest, { params }: Params) {
  const { id } = await params;
  const body = await request.json();

  try {
    const result = await editPatient(id, body);
    if (!result.success) {
      return NextResponse.json({ errors: result.errors }, { status: 400 });
    }
    return NextResponse.json(result.patient);
  } catch {
    return NextResponse.json({ error: "Paciente no encontrado" }, { status: 404 });
  }
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  const { id } = await params;
  try {
    await removePatient(id);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Paciente no encontrado" }, { status: 404 });
  }
}
