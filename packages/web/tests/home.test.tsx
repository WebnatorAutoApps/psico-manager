import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import HomePage from "@/app/page";

afterEach(cleanup);

describe("HomePage", () => {
  it("renders the heading", () => {
    render(<HomePage />);
    expect(
      screen.getByRole("heading", { level: 1, name: /psicomanager/i })
    ).toBeInTheDocument();
  });

  it("renders all feature cards", () => {
    render(<HomePage />);
    expect(screen.getByText("Agenda inteligente")).toBeInTheDocument();
    expect(screen.getByText("Cobros y facturacion")).toBeInTheDocument();
    expect(screen.getByText("Seguimiento de pacientes")).toBeInTheDocument();
    expect(screen.getByText("Asistente personal")).toBeInTheDocument();
  });
});
