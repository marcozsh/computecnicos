import type { Metadata } from "next";
import "./globals.css";
import { roboto } from "./fonts";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "CompuTecnicos",
  description:
    "Página dedicada al servicio técnico de computadores, teclados, etc",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${roboto.className} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
