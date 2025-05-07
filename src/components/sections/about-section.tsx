"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, Power1 } from "gsap";
import ProfilePic from "../../../public/assets/images/Hero.png";
import { useRouter } from "next/navigation";

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRefs = useRef<Array<HTMLParagraphElement | null>>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

  const router = useRouter()

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: Power1.easeOut, duration: 0.8 } });
      tl.from(headingRef.current, { y: -30, opacity: 0 })
        .from(textRefs.current,     { y: 20, opacity: 0, stagger: 0.2 }, "-=0.4")
        .from(buttonRef.current,    { scale: 0.8, opacity: 0 }, "-=0.4")
        .from(imageContainerRef.current, { x: 50, opacity: 0 }, "-=0.6")
        .from(cardRefs.current,     { y: 30, opacity: 0, stagger: 0.2 }, "-=0.6");
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const stats = [
    { label: "Cordéis Publicados",     value: 51 },
    { label: "Livros Publicados",      value: 1 },
    { label: "Palestras Ministradas",  value: "+ de 50" },
  ];

  const bioParagraphs = [
    "Olá, eu sou João Ferreira de Oliveira, nascido em União dos Palmares (AL) e residente em Recife (PE). Poeta desde a adolescência, autor de 51 cordéis na Série Reluz e do livro “Viver como as Borboletas.”",
    "Lecionei Português e Espanhol com pós em Linguística e atuo há mais de 20 anos como expositor espírita em congressos por todo o Brasil.",
    "Minha missão é levar reflexão e esperança pelo verso popular e pela palavra que eleva o espírito.",
  ];

  return (
    <section
      ref={sectionRef}
      className="bg-background dark:bg-background-dark py-20"
    >
      <div className="container mx-auto px-6 md:px-20 flex flex-col-reverse lg:flex-row items-center gap-16">
        <div className="flex-1 space-y-6 text-center lg:text-left z-10">
          <h2
            ref={headingRef}
            className="text-4xl md:text-5xl font-extrabold text-foreground dark:text-foreground-dark"
          >
            Sobre Mim
          </h2>

          {bioParagraphs.map((txt, idx) => (
            <p
              key={idx}
              ref={(el) => { textRefs.current[idx] = el; }}
              className="text-lg text-muted-foreground dark:text-muted-dark max-w-xl mx-auto lg:mx-0"
            >
              {txt}
            </p>
          ))}

          <button
            ref={buttonRef}
            onClick={() =>
              router.push('/sobre-mim')
            }
            className="cursor-pointer inline-block px-8 py-3 bg-black text-white rounded-full hover:bg-white hover:text-black border-2 border-black transition-colors duration-300"
          >
            Saiba Mais
          </button>
        </div>

        <div className="relative flex-shrink-0 w-full lg:w-auto">
          <div
            ref={imageContainerRef}
            className="relative mx-auto w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96"
          >
            <div className="absolute inset-0 bg-primary-light dark:bg-primary-dark rounded-full scale-110" />
            <Image
              src={ProfilePic}
              alt="Foto de João Ferreira"
              fill
              className="object-cover rounded-full border-4 border-background dark:border-background-dark relative z-10 shadow-xl"
            />
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 px-4">
            {stats.map((item, idx) => (
              <div
                key={idx}
                ref={(el) => { cardRefs.current[idx] = el; }}
                className="bg-card text-card-foreground dark:bg-card-foreground dark:text-card rounded-xl p-6 shadow-md text-center"
              >
                <div className="text-4xl font-extrabold text-primary">
                  {item.value}
                </div>
                <div className="mt-1 text-sm text-muted-foreground dark:text-muted-dark">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
