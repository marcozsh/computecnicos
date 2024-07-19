import CustomFooter from "@/components/custom-footer";
import CustomNavBar from "@/components/custom-nav-bar";
import LandingPage from "@/components/landing-page";
import ServicesPage from "@/components/services";
import Why from "@/components/why";
export default function CustomHome() {
  return (
    <>
      <header className="w-screen flex items-start justify-center fixed z-10 top-0">
        <CustomNavBar />
      </header>
      <main className="flex flex-col items-center">
        <section className="flex flex-col items-center lg:flex-row justify-center pt-[100px] lg:pt-[250px] pb-[150px]">
          <LandingPage />
        </section>
        <section
          id="services"
          className="flex flex-row xl:max-w-[60%] pt-[150px] min-h-screen"
        >
          <ServicesPage />
        </section>
        <section id="why" className="flex flex-row justify-center pt-[130px] min-h-screen">
          <Why />
        </section>
        <footer>
          <CustomFooter />
        </footer>
      </main>
    </>
  );
}
