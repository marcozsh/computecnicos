import CustomFooter from "@/components/custom-footer";
import CustomNavBar from "@/components/custom-nav-bar";
import ReviewForm from "@/components/review-components/review";

export default function Review() {
  return (
    <>
      <main className="flex flex-col justify-between h-screen">
        <header className="w-screen flex items-start justify-center z-50">
          <CustomNavBar />
        </header>
        <section className="flex flex-col items-center lg:flex-row justify-center pt-[100px] xl:pt-0 pb-[50px]">
          <ReviewForm />
        </section>
        <footer>
          <CustomFooter />
        </footer>
      </main>
    </>
  );
}
