"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import HospitalIcon from "../../../public/assets/images/mcm_logo.jpg";

const videos = [
  {
    id: "CpQe8EFTxKQ",
    title: "A Gratidão e Seus Efeitos",
    speaker: "João Ferreira de Oliveira",
    summary:
      "Na palestra “A Gratidão e Seus Efeitos”, o expositor apresenta a gratidão como prática transformadora, demonstrando como ela fortalece o equilíbrio emocional, amplia a percepção de abundância e aprofunda a vivência dos princípios espíritas.",
  },
  {
    id: "7RmfyQxgV3g",
    title: "Gestão Emocional na Espiritualidade",
    speaker: "João Ferreira de Oliveira",
    summary:
      "Em “Gestão Emocional na Espiritualidade”, o palestrante descreve técnicas para reconhecer, acolher e transcender emoções desafiadoras por meio do autocuidado, da prece e do apoio fraterno, fundamentadas na doutrina espírita.",
  },
  {
    id: "Pk2Tmr55e5s",
    title: "Cura Interior e Perdão",
    speaker: "João Ferreira de Oliveira",
    summary:
      "A palestra “Cura Interior e Perdão” aborda o perdão como caminho de libertação, combinando ensinamentos espíritas históricos e relatos práticos de reconciliação para favorecer a restauração da paz interior.",
  },
];

export function VideosSection() {
  const router = useRouter();

  return (
    <section className="min-h-screen flex flex-col justify-between bg-quaternary px-6 md:px-20 py-16 text-foreground">
      <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12">
        Minhas Palestras em Vídeo
      </h2>

      <div className="space-y-16">
        {videos.map((v, i) => (
          <div
            key={v.id}
            className={`flex flex-col md:flex-row items-center gap-8 ${
              i % 2 === 1 ? "md:flex-row-reverse" : ""
            }`}
          >
            <div className="flex-1 space-y-4 text-left">
              <div className="flex items-center">
                <Image
                  src={HospitalIcon}
                  alt="Hospital Espírita Maria Cláudia Martins"
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <span className="ml-3 font-medium">{v.speaker}</span>
              </div>

              <h3 className="text-2xl font-semibold">{v.title}</h3>
              <p className="text-gray-700 dark:text-gray-300">{v.summary}</p>
            </div>

            <div className="flex-1 overflow-hidden rounded-lg shadow-lg">
              <iframe
                className="w-full aspect-video"
                src={`https://www.youtube.com/embed/${v.id}`}
                title={v.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-16">
        <p className="mb-4 text-lg">
          Explore todas as minhas palestras para aprofundar sua jornada espiritual.
        </p>
        <button
          onClick={() => router.push("/palestras")}
          className="inline-block px-8 py-3 bg-black text-white rounded-full hover:bg-white hover:text-black border-2 border-black transition-colors cursor-pointer"
        >
          Ver Todas as Palestras
        </button>
      </div>
    </section>
  );
}
