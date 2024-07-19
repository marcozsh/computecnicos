import Image from "next/image";

type CustomCardType = {
  title: string;
  desc: string;
  svg: string;
  alt: string;
};

export default function CustomCard({ title, desc, svg, alt }: CustomCardType) {
  return (
    <div className="w-full px-4 md:w-1/2 lg:w-1/3">
      <div className="group mx-auto mb-10 max-w-[380px] text-center md:mb-16">
        <div className="mx-auto mb-6 flex h-[70px] w-[70px] items-center justify-center text-primary md:mb-9 md:h-[90px] md:w-[90px]">
          <Image src={svg} alt={alt} width={400} height={400} />
        </div>
        <h3 className="mb-3 font-heading text-xl font-medium sm:text-2xl md:mb-5">
          {title}
        </h3>
        <p className="text-base">{desc}</p>
      </div>
    </div>
  );
}
