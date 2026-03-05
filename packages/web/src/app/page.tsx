const FEATURES = [
  {
    title: "Agenda inteligente",
    description:
      "Gestiona citas, horarios y disponibilidad de forma sencilla.",
  },
  {
    title: "Cobros y facturacion",
    description:
      "Controla pagos, genera recibos y lleva la contabilidad al dia.",
  },
  {
    title: "Seguimiento de pacientes",
    description:
      "Historial clinico, notas de sesion y evolucion de cada paciente.",
  },
  {
    title: "Asistente personal",
    description:
      "Recordatorios, tareas pendientes y resumen de tu dia a dia profesional.",
  },
];

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center px-4 py-16">
      <section className="max-w-3xl text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          PsicoManager
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          La herramienta todo-en-uno para psicologos: agenda, cobros,
          seguimiento de pacientes y asistente personal.
        </p>
      </section>

      <section className="mt-16 grid max-w-4xl gap-8 sm:grid-cols-2">
        {FEATURES.map((feature) => (
          <div
            key={feature.title}
            className="rounded-2xl border border-gray-200 p-6"
          >
            <h2 className="text-xl font-semibold">{feature.title}</h2>
            <p className="mt-2 text-gray-600">{feature.description}</p>
          </div>
        ))}
      </section>

      <footer className="mt-24 text-sm text-gray-400">
        PsicoManager &copy; {new Date().getFullYear()}
      </footer>
    </main>
  );
}
