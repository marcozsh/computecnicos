import CustomFooter from "@/components/custom-footer";
import CustomNavBar from "@/components/custom-nav-bar";
import SignUpLoginTab from "@/components/sign-login-tab";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Computecnicos | Administrador",
  description: "Panel de login para el administrador",
};

export default function AdminPage() {
  return (
    <>
      <main className="flex flex-col items-center h-screen justify-between">
        <header className="w-screen flex items-start justify-center fixed z-10 top-0">
          <CustomNavBar />
        </header>
        <section className="flex flex-col items-center lg:flex-row justify-center pt-[100px] lg:pt-[150px] pb-[150px]">
          <SignUpLoginTab />
        </section>
        <footer>
          <CustomFooter />
        </footer>
      </main>
    </>
  );
}
