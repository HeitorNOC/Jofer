"use client";

import { gsap, Power1 } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BookOpen, MessageSquare } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import ProfilePic from "../../../public/assets/images/Hero.png";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRefs = useRef<Array<HTMLParagraphElement | null>>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

  const router = useRouter();

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Create a timeline for the section animations
      // Create a timeline for the section animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none"
        },
        defaults: { ease: Power1.easeOut, duration: 0.8 }
      });

      // Animate all elements at once with staggered timing
      tl.from(
        [
          headingRef.current,
          ...textRefs.current,
          buttonRef.current,
          imageContainerRef.current,
          ...cardRefs.current
        ],
        {
          y: 30,
          opacity: 0,
          stagger: 0.1,
          duration: 0.7
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    {
      label: "Cordéis Publicados",
      value: 51,
      icon: <BookOpen className="w-6 h-6 text-primary/70" />
    },
    {
      label: "Livros Publicados",
      value: 1,
      icon: <BookOpen className="w-6 h-6 text-primary/70" />
    },
    {
      label: "Palestras Ministradas",
      value: "+ de 50",
      icon: <MessageSquare className="w-6 h-6 text-primary/70" />
    },
  ];

  const bioParagraphs = [
    "Olá, eu sou João Ferreira de Oliveira, nascido em União dos Palmares (AL) e residente em Recife (PE). Poeta desde a adolescência, autor de 51 cordéis na Série Reluz e do livro 'Viver como as Borboletas.'",
    "Lecionei Português e Espanhol com pós em Linguística e atuo há mais de 20 anos como expositor espírita em congressos por todo o Brasil.",
    "Minha missão é levar reflexão e esperança pelo verso popular e pela palavra que eleva o espírito.",
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-24 overflow-hidden"
    >
      {/* Background with subtle pattern */}
      <div className="absolute inset-0 bg-background dark:bg-background-dark opacity-95">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/30 dark:to-background-dark/30"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iLjAyIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-50 dark:opacity-30"></div>
      </div>

      <div className="container mx-auto px-6 md:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Image Column */}
          <div className="relative flex-shrink-0 w-full lg:w-5/12 order-2 lg:order-1">
            <div
              ref={imageContainerRef}
              className="relative mx-auto w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96"
            >
              {/* Decorative elements */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-full blur-md"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-primary/10 dark:from-primary/20 dark:to-primary-dark/30 rounded-full"></div>

              {/* Profile image */}
              <div className="absolute inset-0 rounded-full overflow-hidden border-4 border-white/80 dark:border-gray-800/80 shadow-2xl">
                <Image
                  src={ProfilePic}
                  alt="Foto de João Ferreira"
                  fill
                  sizes="(max-width: 768px) 18rem, (max-width: 1024px) 20rem, 24rem"
                  className="object-cover"
                  priority
                />
              </div>

              {/* Decorative dots */}
              <div className="absolute -bottom-6 -left-6 w-12 h-12 grid grid-cols-2 gap-1">
                <div className="w-3 h-3 rounded-full bg-primary/40"></div>
                <div className="w-3 h-3 rounded-full bg-primary/60"></div>
                <div className="w-3 h-3 rounded-full bg-primary/80"></div>
                <div className="w-3 h-3 rounded-full bg-primary"></div>
              </div>

              {/* Decorative shape */}
              <div className="absolute -top-8 -right-8 w-16 h-16 rounded-full border-4 border-dashed border-primary/30 dark:border-primary/20"></div>
            </div>

            {/* Stats Cards */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {stats.map((item, idx) => (
                <div
                  key={idx}
                  ref={(el) => { cardRefs.current[idx] = el; }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center group"
                >
                  <div className="flex justify-center mb-3 opacity-80 group-hover:opacity-100 transition-opacity">
                    {item.icon}
                  </div>
                  <div className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80 dark:from-primary dark:to-primary/70">
                    {item.value}
                  </div>
                  <div className="mt-1 text-sm font-medium text-gray-600 dark:text-gray-300">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Content Column */}
          <div className="flex-1 space-y-8 text-center lg:text-left order-1 lg:order-2">
            <div>
              <div className="inline-block px-3 py-1 rounded-full bg-primary/10 dark:bg-primary/20 text-primary text-sm font-medium mb-4">
                Conheça minha história
              </div>
              <h2
                ref={headingRef}
                className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300"
              >
                Sobre Mim
              </h2>
            </div>

            <div className="space-y-6">
              {bioParagraphs.map((txt, idx) => (
                <p
                  key={idx}
                  ref={(el) => { textRefs.current[idx] = el; }}
                  className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed"
                >
                  {txt}
                </p>
              ))}
            </div>

            <button
              ref={buttonRef}
              onClick={() => router.push('/sobre-mim')}
              className="group relative overflow-hidden px-8 py-4 bg-primary text-white rounded-xl hover:bg-primary/90 shadow-md hover:shadow-xl transition-all duration-300"
            >
              <span className="relative z-10 flex items-center gap-2">
                <span>Saiba Mais</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform group-hover:translate-x-1"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary-dark to-primary scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"></div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
