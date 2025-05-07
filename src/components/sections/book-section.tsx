// components/BookSection.tsx
"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { gsap, Power1 } from "gsap";
import { Tooltip, TooltipTrigger, TooltipContent } from "../ui/tooltip";
import { Info } from "lucide-react";

export function BookSection() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.from(containerRef.current, {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: Power1.easeOut,
      });
    }
  }, []);

  const handleVerLivro = () => router.push("/livros");

  return (
    <section
      ref={containerRef}
      className="
        flex flex-col md:flex-row items-center justify-between
        min-h-screen px-6 md:px-20 py-16
        bg-background
        text-gray-900 dark:text-gray-100
      "
    >
      <div className="flex-1 space-y-6 text-center md:text-left z-10">
        <h2 className="text-4xl md:text-5xl font-extrabold">
          Viver como as Borboletas
        </h2>
        <p className="text-lg md:text-xl max-w-lg">
          “Viver como as Borboletas” é uma coleção de poemas inspiradores que
          celebram a leveza da alma e o renascimento espiritual.
        </p>
        <p className="italic text-gray-600 dark:text-gray-300 max-w-md">
          João Ferreira de Oliveira explora, através de imagens poéticas, o voo
          libertador do espírito e as pequenas grandes alegrias da vida.
        </p>
        <button
          onClick={handleVerLivro}
          className="
            inline-block px-8 py-3 bg-black text-white rounded-full
            hover:bg-white hover:text-black border-2 border-black
            transition-colors duration-300 cursor-pointer
          "
        >
          Ver Livro
        </button>
      </div>

      <div className="relative flex-shrink-0 mt-12 md:mt-0">
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              className="
                absolute top-0 right-0 mr-2 z-20
                p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700
                transition-colors
              "
            >
              <Info size={18} className="text-gray-600 dark:text-gray-300" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="top">
            <p>O modelo 3D é meramente ilustrativo em relação ao tamanho.</p>
          </TooltipContent>
        </Tooltip>

        <div className="relative z-10 w-64 h-72 md:w-72 md:h-96 lg:w-80 lg:h-[500px]">
          <iframe
            src="/assets/livros/01 - Viver como as borboletas/livro3dhtml.html"
            className="w-full h-full bg-transparent rounded-lg"
          />
        </div>
      </div>
    </section>
  );
}
