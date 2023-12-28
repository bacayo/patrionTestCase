"use client";

import CountryMap from "@/components/Test";
import { useState } from "react";

export default function Home() {
  const [city, setCity] = useState("");

  const handleClick = (e: React.MouseEvent<SVGGElement, MouseEvent>) => {
    setCity(
      e.currentTarget.attributes.getNamedItem("data-iladi")?.value as string
    );
  };

  console.log(city);

  return (
    <main className="flex h-screen justify-center items-center">
      <CountryMap onClick={handleClick} />
    </main>
  );
}
