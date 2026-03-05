export interface PatientInput {
  fullName: string;
  email: string;
  phone: string;
  notes?: string;
}

export interface ValidationError {
  field: string;
  message: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^\+?[\d\s\-()]{7,20}$/;

export function validatePatient(input: PatientInput): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!input.fullName.trim()) {
    errors.push({ field: "fullName", message: "El nombre es obligatorio" });
  }

  if (!input.email.trim()) {
    errors.push({ field: "email", message: "El email es obligatorio" });
  } else if (!EMAIL_REGEX.test(input.email.trim())) {
    errors.push({ field: "email", message: "El email no es valido" });
  }

  if (!input.phone.trim()) {
    errors.push({ field: "phone", message: "El telefono es obligatorio" });
  } else if (!PHONE_REGEX.test(input.phone.trim())) {
    errors.push({ field: "phone", message: "El telefono no es valido" });
  }

  return errors;
}
