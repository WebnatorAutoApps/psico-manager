export interface Patient {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreatePatientInput {
  fullName: string;
  email: string;
  phone: string;
  notes?: string;
}

export type UpdatePatientInput = Partial<CreatePatientInput>;
