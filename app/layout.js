import "./globals.css";

export const metadata = {
  title: "Consulta Municipal | Municipalidad de Cusco",
  description: "Portal demostrativo de consultas municipales y registro administrativo.",
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}