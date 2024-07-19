"use client";
import { Tabs, Tab } from "@nextui-org/react";
import { useState } from "react";
import WhyTab from "./why-tab";

export default function Why() {
  const [selected, setSelected] = useState<string>("trans");
  return (
    <>
      <div className="flex w-full flex-col p-10 text-center">
        <h2 className="font-heading text-3xl font-bold sm:text-4xl md:text-[50px] md:leading-[60px] mb-14">
          Por qué debes escogernos
        </h2>
        <h3 className="text-xs xl:text-lg opacity-60 mb-10">
          En nuestro servicio, nos comprometemos a ofrecer la mejor experiencia
          para nuestros clientes.
        </h3>
        <Tabs
          aria-label="Options"
          selectedKey={selected}
          onSelectionChange={(key) => setSelected(key as string)}
          fullWidth
          variant="bordered"
        >
          <Tab key="trans" title="Transparencia">
            <div className="flex justify-center">
              <WhyTab
                desc="Creemos en la honestidad y la claridad. Te mantenemos informado en cada paso del proceso, sin costos ocultos ni sorpresas desagradables. Cada servicio y cotización es detalladamente explicado para que sepas exactamente lo que estás recibiendo."
                img="handshake.svg"
              />
            </div>
          </Tab>
          <Tab key="confi" title="Confianza">
            <div className="flex justify-center">
              <WhyTab
                desc=" Con años de experiencia en el sector y una reputación sólida, puedes confiar en que tu equipo está en buenas manos. Nos aseguramos de manejar tus dispositivos con el máximo cuidado y profesionalismo."
                img="hand_heart.svg"
              />
            </div>
          </Tab>
          <Tab key="speed" title="Rapidez">
            <div className="flex justify-center">
              <WhyTab
                desc="Sabemos lo importante que es tu tiempo. Nos esforzamos por realizar todos nuestros servicios de manera rápida y eficiente, sin comprometer la calidad. Nos aseguramos de que tu equipo esté de vuelta en funcionamiento lo antes posible."
                img="clock.svg"
              />
            </div>
          </Tab>
        </Tabs>
      </div>
    </>
  );
}
