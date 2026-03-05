import { NextRequest, NextResponse } from "next/server";
import { listPatients, createPatient } from "@/lib/patients/use-cases";

export async function GET(request: NextRequest) {
  const search = request.nextUrl.searchParams.get("search") ?? undefined;
  const patients = await listPatients(search);
  return NextResponse.json(patients);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const result = await createPatient(body);

  if (!result.success) {
    return NextResponse.json({ errors: result.errors }, { status: 400 });
  }

  return NextResponse.json(result.patient, { status: 201 });
}
