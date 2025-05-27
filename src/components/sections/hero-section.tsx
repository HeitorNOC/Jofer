"use client";

import { gsap, Power1 } from "gsap";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Colibri from "../../../public/assets/images/Colibri.svg";
import HeroImage from "../../../public/assets/images/Hero.png";

const quotes = [
  "Portanto, decidi: vou viver como as borboletas, que se entregam às flores de corpo e asas.",
  "A estrada é mais curta para aquele que ama.",
  "Faz como a flor: rompe o casulo.",
];

export function HeroSection() {
  const router = useRouter();
  const [currentQuote, setCurrentQuote] = useState(0);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const quoteRef = useRef<HTMLParagraphElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const decorationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.set(sectionRef.current, { opacity: 0 });

    const ctx = gsap.context(() => {
      gsap.to(sectionRef.current!, { opacity: 1, duration: 0.5 });

      const introTl = gsap.timeline();
      introTl
        .from(headerRef.current!, {
          y: -40,
          opacity: 0,
          duration: 1,
          ease: Power1.easeOut,
        })
        .from(
          subtitleRef.current!,
          { y: -20, opacity: 0, duration: 0.8, ease: Power1.easeOut },
          "-=0.6"
        )
        .from(
          imageRef.current!,
          {
            scale: 0.8,
            opacity: 0,
            duration: 1,
            ease: Power1.easeOut,
          },
          "-=0.8"
        )
        .from(
          decorationRef.current!,
          {
            scale: 1.2,
            opacity: 0,
            duration: 1.2,
            ease: Power1.easeOut,
          },
          "-=1"
        );

      // Initial quote animation
      gsap.to(quoteRef.current!, {
        opacity: 1,
        duration: 1.5,
        ease: Power1.easeInOut,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Handle quote rotation
  useEffect(() => {
    const interval = setInterval(() => {
      gsap.to(quoteRef.current!, {
        opacity: 0,
        duration: 1,
        onComplete: () => {
          setCurrentQuote((prev) => (prev + 1) % quotes.length);
          gsap.to(quoteRef.current!, {
            opacity: 1,
            duration: 1,
          });
        },
      });
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative opacity-0 min-h-[90vh] md:min-h-screen flex flex-col justify-center items-center py-16 md:py-24 overflow-hidden bg-gradient-to-br from-quaternary to-quaternary/80 dark:from-quaternary-dark dark:to-quaternary-dark/90"
    >
      {/* Decorative elements */}
      <div ref={decorationRef} className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/10 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-secondary/10 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12 z-10">
        <div className="flex flex-col space-y-6 text-center md:text-left max-w-2xl">
          <h1
            ref={headerRef}
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-gray-700 to-primary dark:from-primary dark:to-primary/80"
          >
            João Ferreira
          </h1>

          <p
            ref={subtitleRef}
            className="text-xl md:text-2xl text-foreground-dark dark:text-foreground font-light"
          >
            Poeta, Palestrante & Divulgador Espírita
          </p>
        </div>

        <div ref={imageRef} className="relative flex-shrink-0">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 blur-md scale-105"></div>
          <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-white/30 dark:border-gray-800/50 shadow-2xl">
            <Image
              src={HeroImage}
              alt="Foto de João Ferreira"
              fill
              priority
              sizes="(max-width: 768px) 16rem, (max-width: 1024px) 20rem, 24rem"
              className="object-cover"
            />
          </div>

          <div className="absolute -bottom-4 -right-4 w-24 h-24 md:w-32 md:h-32 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center shadow-lg">
            <div className="w-20 h-20 md:w-28 md:h-28 relative">
              <Image
                src={Colibri}
                alt="Colibri"
                fill
                className="object-contain p-2"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 md:mt-24 max-w-3xl mx-auto text-center px-6">
        <p
          ref={quoteRef}
          className="min-h-[4rem] text-center italic text-lg md:text-xl lg:text-2xl text-foreground-dark dark:text-foreground/90 font-light opacity-0"
        >
          &ldquo;{quotes[currentQuote]}&rdquo;
        </p>
      </div>
    </section>
  );
}
