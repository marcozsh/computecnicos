import { InstagramSvg, Xsvg } from "@/data/svg";
import { Link, Button, Divider } from "@nextui-org/react";

export default function CustomFooter() {
  return (
    <>
      <div className="flex flex-col items-start sm:items-center lg:flex-row justify-center bg-background w-screen text-white p-10 gap-10 lg:gap-20 lg:pr-40">
        <div className="flex flex-col gap-5">
          <h3 className="text-lg font-semibold">
            Horario de atención a domicilio
          </h3>
          <ul>
            <li>Sábados - Domingos: 12:00 hasta 19:00</li>
          </ul>
        </div>
        <div className="flex flex-col gap-5">
          <h3 className="text-lg font-semibold">
            ¿Ya has usado nuestros servicios?
          </h3>
          <Button
            as={Link}
            color="primary"
            variant="ghost"
            href="review/"
          >
            ¡Valora nuestro trabajo!
          </Button>
        </div>
        <div className="flex flex-col gap-5">
          <h3 className="text-lg font-semibold">Redes sociales</h3>
          <div className="flex flex-row gap-2">
            <Link href="https://x.com/marcozsh" isExternal showAnchorIcon anchorIcon={<Xsvg />} />
            <Link
              href="https://www.instagram.com/_computecnicos_/"
              isExternal
              showAnchorIcon
              anchorIcon={<InstagramSvg />}
            />
          </div>
        </div>
      </div>
      <Divider className="bg-primary"/>
      <div className="bg-background flex flex-row justify-center text-white gap-1 p-4">
        <span>2024 - Diseñado por</span>
        <Link href="https://marcozsh.dev" isExternal>
          Marco Peña
        </Link>
      </div>
    </>
  );
}
