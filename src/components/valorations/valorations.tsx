import { sql } from "@vercel/postgres";
import { EmblaCarousel, CarouselType } from "./custom-carousel";

import { EmblaOptionsType } from "embla-carousel";
const OPTIONS: EmblaOptionsType = { direction: "rtl", loop: true };

export default async function Valorations({
  params,
}: {
  params: { approve: boolean };
}): Promise<JSX.Element> {
  const { rows } =
    await sql`SELECT id, name, message ,stars from valorations where approve =${params.approve} order by id`;
  const valorations: CarouselType[] = rows.map((row) => ({
    id: row.id,
    name: row.name,
    message: row.message,
    stars: row.stars,
  }));

  return (
    <div>
      <div className="flex flex-col text-center">
          <h2 className="font-heading text-2xl font-bold sm:text-4xl md:text-[50px] md:leading-[60px] mb-14">
            Nuestros clientes
          </h2>
        <EmblaCarousel valorations={valorations} options={OPTIONS} />
      </div>
    </div>
  );
}
