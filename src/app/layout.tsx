import type { Metadata } from "next";
import "./globals.css";
import { roboto } from "./fonts";
import Providers from "./providers";
import { Toaster } from "react-hot-toast";
import SessionWrapper from "./session-wrapper";

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
    <SessionWrapper>
      <html lang="es">
        <body className={`${roboto.className} antialiased`}>
          <Toaster position="top-center" />
          <Providers>{children}</Providers>
        </body>
      </html>
    </SessionWrapper>
  );
}
