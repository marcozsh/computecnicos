import CustomFooter from "@/components/custom-footer";
import CustomNavBar from "@/components/custom-nav-bar";
import ContactForm from "@/components/form/form";

export default function ContactUs() {
  return (
    <>
      <main className="flex flex-col h-screen justify-between">
        <header className="w-screen flex items-start justify-center fixed z-50 top-0">
          <CustomNavBar />
        </header>
        <section className="flex flex-col items-center lg:flex-row justify-center pt-[100px] pb-[50px]">
          <ContactForm />
        </section>
        <footer>
          <CustomFooter />
        </footer>
      </main>
    </>
  );
}
