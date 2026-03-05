import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PsicoManager - Gestion integral para psicologos",
  description:
    "Agenda, cobros, seguimiento de pacientes y asistente personal para profesionales de la psicologia.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-white text-gray-900 antialiased">
        {children}
      </body>
    </html>
  );
}
