import CustomFooter from "@/components/custom-footer";
import CustomNavBar from "@/components/custom-nav-bar";

export default function Review() {
  return (
    <>
      <main className="flex flex-col justify-between h-screen">
      <header className="w-screen flex items-start justify-center z-50">
        <CustomNavBar />
      </header>
        <section className="flex flex-col items-center lg:flex-row justify-center pt-[100px] pb-[50px]">
      <h2 className="font-heading text-4xl font-bold sm:text-4xl md:text-[50px] md:leading-[60px]">
        Soon....
      </h2>
        </section>
        <footer>
          <CustomFooter />
        </footer>
      </main>
    </>
  );
}
