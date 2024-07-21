import CustomTypeWritter from "@/components/typewritter";
import { Button, Image, Link } from "@nextui-org/react";

export default function LandingPage() {
  return (
    <>
      <div className="mr-30 p-10 lg:p-0 lg:max-w-[30%] leading-tight flex flex-col gap-4">
        <h1 className="mb-5 font-heading text-4xl font-bold sm:text-4xl md:text-[40px] md:leading-[60px]">
          Servicio Técnico
        </h1>
        <h2 className="text-xs xl:text-xl opacity-60">
          <CustomTypeWritter />
        </h2>
        <p className="mt-5 mb-5 text-lg">
          Nuestro equipo de expertos ofrece un servicio excepcional, asegurando
          que tus equipos funcionen de manera óptima. Disfruta de la
          tranquilidad de saber que estás en buenas manos y recibe atención
          personalizada directamente en tu hogar. ¡Contáctanos y experimenta la
          diferencia!
        </p>
        <div className="flex justify-center lg:justify-normal">
          <Button
            as={Link}
            color="secondary"
            variant="ghost"
	    href="contact-us/"
	    className="text-xl"
          >
            ¡Contáctanos!
          </Button>
        </div>
      </div>
      <div className="max-w-[58%]">
        <Image className="static" src={"pc3.png"} width={600} alt="PC IMG" />
      </div>
    </>
  );
}
