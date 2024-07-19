import { Image } from "@nextui-org/react";

type WhyTabType = {
  desc: string;
  img: string;
};

export default function WhyTab({ desc, img }: WhyTabType) {
  return (
    <>
      <div className="p-10 lg:pt-10 leading-tight flex flex-col gap-4">
        <div className="flex flex-row">
          <div className="flex flex-row max-w-[600px]">
            <p className="mt-5 mb-5 text-lg">{desc}</p>
          </div>
          <div className="hidden lg:block lg:max-w-[58%]">
            <Image
              className="static"
              src={img}
              width={300}
	      height={300}
              alt="PC IMG"
            />
          </div>
        </div>
      </div>
    </>
  );
}
