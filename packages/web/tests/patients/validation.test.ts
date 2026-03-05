import { describe, it, expect } from "vitest";
import { validatePatient } from "@/lib/patients/validation";

describe("validatePatient", () => {
  const validInput = {
    fullName: "Maria Lopez",
    email: "maria@example.com",
    phone: "+34 612 345 678",
  };

  it("returns no errors for valid input", () => {
    expect(validatePatient(validInput)).toEqual([]);
  });

  it("requires full name", () => {
    const errors = validatePatient({ ...validInput, fullName: "  " });
    expect(errors).toContainEqual({
      field: "fullName",
      message: "El nombre es obligatorio",
    });
  });

  it("requires email", () => {
    const errors = validatePatient({ ...validInput, email: "" });
    expect(errors).toContainEqual({
      field: "email",
      message: "El email es obligatorio",
    });
  });

  it("validates email format", () => {
    const errors = validatePatient({ ...validInput, email: "not-an-email" });
    expect(errors).toContainEqual({
      field: "email",
      message: "El email no es valido",
    });
  });

  it("accepts valid email formats", () => {
    const cases = ["user@domain.com", "user+tag@domain.co.uk"];
    cases.forEach((email) => {
      const errors = validatePatient({ ...validInput, email });
      expect(errors.find((e) => e.field === "email")).toBeUndefined();
    });
  });

  it("requires phone", () => {
    const errors = validatePatient({ ...validInput, phone: "" });
    expect(errors).toContainEqual({
      field: "phone",
      message: "El telefono es obligatorio",
    });
  });

  it("validates phone format", () => {
    const errors = validatePatient({ ...validInput, phone: "abc" });
    expect(errors).toContainEqual({
      field: "phone",
      message: "El telefono no es valido",
    });
  });

  it("accepts valid phone formats", () => {
    const cases = ["+34 612345678", "612-345-678", "(612) 345 678", "1234567"];
    cases.forEach((phone) => {
      const errors = validatePatient({ ...validInput, phone });
      expect(errors.find((e) => e.field === "phone")).toBeUndefined();
    });
  });

  it("returns multiple errors at once", () => {
    const errors = validatePatient({ fullName: "", email: "", phone: "" });
    expect(errors).toHaveLength(3);
  });
});
