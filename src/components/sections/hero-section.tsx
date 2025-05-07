"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { gsap, Power1 } from "gsap";
import Image from "next/image";
import HeroImage from "../../../public/assets/images/Hero.png";
import Colibri from "../../../public/assets/images/Colibri.svg";
import { Button } from "../ui/button";

const quotes = [
  "“No céu do sertão, o verso voa como colibri, leve e colorido.”",
  "“Cordel é canto do povo, ecoando a memória em papel.”",
  "“Cada estrofe um suspiro, cada rima um coração que bate.”",
];

export function HeroSection() {
  const router = useRouter();
  const headerRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (
      !headerRef.current ||
      !subtitleRef.current ||
      !buttonsRef.current ||
      !quoteRef.current
    ) {
      return;
    }

    let idx = 0;
    const introTl = gsap.timeline();
    introTl
      .from(headerRef.current, {
        y: -40,
        opacity: 0,
        duration: 1,
        ease: Power1.easeOut,
      })
      .from(
        subtitleRef.current,
        { y: -20, opacity: 0, duration: 0.8, ease: Power1.easeOut },
        "-=0.6"
      )
      .from(
        Array.from(buttonsRef.current.children),
        {
          x: -20,
          opacity: 0,
          duration: 0.6,
          stagger: 0.2,
          ease: Power1.easeOut,
        },
        "-=0.4"
      );

    const rotateQuote = () => {
      quoteRef.current!.textContent = quotes[idx];
      gsap.to(quoteRef.current, {
        opacity: 1,
        duration: 1.5,
        ease: Power1.easeInOut,
      });
      gsap.to(quoteRef.current, {
        opacity: 0,
        duration: 1.5,
        delay: 5,
        ease: Power1.easeInOut,
        onComplete: () => {
          idx = (idx + 1) % quotes.length;
          rotateQuote();
        },
      });
    };

    rotateQuote();

    return () => {
      introTl.kill();
      gsap.killTweensOf(quoteRef.current!);
    };
  }, []);

  return (
    <section className="flex flex-col justify-between items-center min-h-screen pt-25 bg-quaternary dark:bg-quaternary-dark text-gray-900 dark:text-gray-100">
      <div className="w-full max-w-6xl flex flex md:flex-row items-center justify-between">
        <div className="flex flex-col align-middle justify-center space-y-2 text-center md:text-left">
          <h1
            ref={headerRef}
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-primary-dark dark:text-primary"
          >
            João Ferreira
          </h1>
          <p
            ref={subtitleRef}
            className="text-xl md:text-2xl text-foreground-dark dark:text-foreground"
          >
            Poeta, Palestrante & Divulgador Espírita.
          </p>
          <div
            ref={buttonsRef}
            className="flex flex-wrap justify-center md:justify-start gap-4"
          >
            <Button
              onClick={() => router.push("/contact")}
              className="cursor-pointer px-6 py-3 bg-primary text-background border-2 border-primary hover:bg-transparent hover:text-primary hover:border-primary transition-colors"
            >
              Entre em Contato
            </Button>
          </div>
        </div>
        <div className="relative flex-shrink-0">
          <div className="absolute inset-0 rounded-full bg-quaternary-light dark:bg-quaternary opacity-20 scale-105"></div>
          <div className="relative w-56 h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full overflow-hidden border-4 border-secondary shadow-2xl">
            <Image
              src={HeroImage}
              alt="Foto de João"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
      <div className="w-full max-w-6xl flex flex-col items-center">
        <p
          ref={quoteRef}
          className="min-h-[3rem] max-w-2xl text-center italic text-lg md:text-xl opacity-0"
        />
        <div className="w-32 h-24 mt-4">
          <Image
            src={Colibri}
            alt="Colibri"
            width={200}
            height={150}
            className="object-contain opacity-30"
          />
        </div>
      </div>
    </section>
  );
}
