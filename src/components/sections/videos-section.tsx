"use client";

import { gsap, Power1 } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Play, Video } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import HospitalIcon from "../../../public/assets/images/mcm_logo.jpg";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const videos = [
  {
    id: "CpQe8EFTxKQ",
    title: "A Gratidão e Seus Efeitos",
    speaker: "João Ferreira de Oliveira",
    location: "Hospital Espírita Maria Cláudia Martins",
    date: "15 de Março, 2025",
    summary:
      "Na palestra 'A Gratidão e Seus Efeitos', o expositor apresenta a gratidão como prática transformadora, demonstrando como ela fortalece o equilíbrio emocional, amplia a percepção de abundância e aprofunda a vivência dos princípios espíritas.",
    views: "1.2K",
  },
  {
    id: "7RmfyQxgV3g",
    title: "Gestão Emocional na Espiritualidade",
    speaker: "João Ferreira de Oliveira",
    location: "Hospital Espírita Maria Cláudia Martins",
    date: "28 de Janeiro, 2025",
    summary:
      "Em 'Gestão Emocional na Espiritualidade', o palestrante descreve técnicas para reconhecer, acolher e transcender emoções desafiadoras por meio do autocuidado, da prece e do apoio fraterno, fundamentadas na doutrina espírita.",
    views: "987",
  },
  {
    id: "Pk2Tmr55e5s",
    title: "Cura Interior e Perdão",
    speaker: "João Ferreira de Oliveira",
    location: "Hospital Espírita Maria Cláudia Martins",
    date: "10 de Dezembro, 2024",
    summary:
      "A palestra 'Cura Interior e Perdão' aborda o perdão como caminho de libertação, combinando ensinamentos espíritas históricos e relatos práticos de reconciliação para favorecer a restauração da paz interior.",
    views: "1.5K",
  },
];

export function VideosSection() {
  const router = useRouter();
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const videoRefs = useRef<Array<HTMLDivElement | null>>([]);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  // Animation setup
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Create a timeline for the section animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 20%",
          toggleActions: "play none none none"
        },
        defaults: { ease: Power1.easeOut }
      });

      // Title animation
      if (titleRef.current) {
        tl.from(titleRef.current, {
          y: -30,
          opacity: 0,
          duration: 0.8
        });
      }

      // Video cards animations
      if (videoRefs.current.length) {
        tl.from(videoRefs.current, {
          y: 50,
          opacity: 0,
          stagger: 0.3,
          duration: 0.8
        }, "-=0.5");
      }

      // CTA animation
      if (ctaRef.current) {
        tl.from(ctaRef.current, {
          y: 30,
          opacity: 0,
          duration: 0.6
        }, "-=0.3");
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handlePlayVideo = (videoId: string) => {
    setActiveVideo(videoId === activeVideo ? null : videoId);
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-24 overflow-hidden"
    >
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-quaternary/95 to-quaternary dark:from-gray-900 dark:to-gray-800/95">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjAzIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-50"></div>
      </div>

      <div className="container mx-auto px-6 md:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-primary/10 dark:bg-primary/20 text-primary text-sm font-medium mb-4">
            Palestras em Vídeo
          </div>
          <h2
            ref={titleRef}
            className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 mb-6"
          >
            Minhas Palestras em Vídeo
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            Assista às palestras espíritas que ministrei em diversos centros e congressos pelo Brasil.
          </p>
        </div>

        <div className="space-y-16 md:space-y-24">
          {videos.map((video, idx) => (
            <div
              key={video.id}
              ref={(el) => { videoRefs.current[idx] = el; }}
              className={`flex flex-col ${idx % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-8 lg:gap-16`}
            >
              {/* Video Column */}
              <div className="w-full lg:w-1/2">
                <div className="relative aspect-video rounded-xl overflow-hidden shadow-xl bg-black">
                  {activeVideo === video.id ? (
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
                      title={video.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  ) : (
                    <>
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <button
                          onClick={() => handlePlayVideo(video.id)}
                          className="w-16 h-16 md:w-20 md:h-20 bg-primary/90 hover:bg-primary rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110"
                          aria-label="Play video"
                        >
                          <Play className="w-8 h-8 text-white fill-white ml-1" />
                        </button>
                      </div>
                      <img
                        src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                    </>
                  )}
                </div>

                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center">
                    <Video className="w-4 h-4 text-primary mr-2" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">{video.views} visualizações</span>
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{video.date}</span>
                </div>
              </div>

              {/* Content Column */}
              <div className="w-full lg:w-1/2 space-y-6">
                <div className="flex items-center">
                  <Image
                    src={HospitalIcon}
                    alt={video.location}
                    width={40}
                    height={40}
                    className="rounded-full border-2 border-white/80 dark:border-gray-800/80"
                  />
                  <div className="ml-3">
                    <p className="font-medium text-gray-900 dark:text-white">{video.speaker}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{video.location}</p>
                  </div>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                  {video.title}
                </h3>

                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {video.summary}
                </p>

                <a
                  href={`https://www.youtube.com/watch?v=${video.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  <span>Assistir no YouTube</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        <div
          ref={ctaRef}
          className="text-center max-w-3xl mx-auto mt-20 space-y-6"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            Explore todas as minhas palestras
          </h3>

          <p className="text-gray-700 dark:text-gray-300">
            Aprofunde sua jornada espiritual com mais de 50 palestras disponíveis em nosso acervo.
          </p>

          <button
            onClick={() => router.push("/palestras")}
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-xl hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <Video className="w-5 h-5" />
            <span>Ver Todas as Palestras</span>
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
          </button>
        </div>
      </div>
    </section>
  );
}
