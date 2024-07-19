import {servicesData} from "@/data/data";
import CustomCard from "./custom-card";

export default function ServicesPage() {
  return (
    <>
      <div className="flex flex-col text-center">
        <h2 className="font-heading text-3xl font-bold sm:text-4xl md:text-[50px] md:leading-[60px] mb-14">
          Servicios
        </h2>
        <div className="flex flex-col items-center lg:flex-row justify-center flex-wrap">
          {servicesData?.map((service, index) => {
            return (
              <CustomCard
                key={index}
                title={service.title}
                desc={service.desc}
                svg={service.svg}
                alt={service.alt}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
