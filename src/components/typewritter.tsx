"use client";
import { TypeAnimation } from "react-type-animation";

export default function CustomTypeWritter() {
  return (
    <TypeAnimation
      sequence={[
        "Soluciones Técnicas",
        500,
        "Soluciones Técnicas Rápidas",
        1000,
        "Soluciones Técnicas Confiables",
        1000,
      ]}
      wrapper="span"
      speed={40}
      style={{ fontSize: "1.5em", display: "inline-block" }}
      repeat={Infinity}
    />
  );
}
