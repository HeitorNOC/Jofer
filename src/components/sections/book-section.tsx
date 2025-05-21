'use client'

import { gsap, Power1 } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { BookOpen, Info, Quote, Star } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function BookSection() {
  const router = useRouter()
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const modelRef = useRef<HTMLDivElement>(null)
  const quoteRef = useRef<HTMLDivElement>(null)
  const [modelLoaded, setModelLoaded] = useState(false)

  // Load model viewer
  useEffect(() => {
    import('@google/model-viewer')
      .then(() => setModelLoaded(true))
      .catch(err => console.error('ModelViewer load failed', err))
  }, [])

  // Animations
  useEffect(() => {
    if (!sectionRef.current) return

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

      // Content animations - with null checks
      if (contentRef.current) {
        const heading = contentRef.current.querySelector('h2');
        const paragraphs = contentRef.current.querySelectorAll('p');
        const button = contentRef.current.querySelector('button');

        if (heading) {
          tl.from(heading, {
            y: -30,
            opacity: 0,
            duration: 0.8
          });
        }

        if (paragraphs.length) {
          tl.from(paragraphs, {
            y: 20,
            opacity: 0,
            stagger: 0.2,
            duration: 0.6
          }, "-=0.5");
        }

        if (button) {
          tl.from(button, {
            scale: 0.9,
            opacity: 0,
            duration: 0.5
          }, "-=0.3");
        }
      }

      // Model animations
      if (modelRef.current) {
        tl.from(modelRef.current, {
          x: 50,
          opacity: 0,
          duration: 0.8,
          scale: 0.9,
          rotationY: -15
        }, "-=0.8");
      }

      // Quote animations
      if (quoteRef.current) {
        tl.from(quoteRef.current, {
          y: 30,
          opacity: 0,
          duration: 0.6
        }, "-=0.5");
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [modelLoaded]);

  const handleVerLivro = () => router.push('/livros')

  return (
    <section
      ref={sectionRef}
      className="relative py-24 overflow-hidden"
    >
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background to-background/90 dark:from-gray-900 dark:to-gray-800/90">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iLjAyIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-50 dark:opacity-30"></div>
      </div>

      <div className="container mx-auto px-6 md:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          {/* Content Column */}
          <div ref={contentRef} className="flex-1 space-y-8 text-center lg:text-left">
            <div>
              <div className="inline-block px-3 py-1 rounded-full bg-primary/10 dark:bg-primary/20 text-primary text-sm font-medium mb-4">
                Obra Literária
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300">
                Viver como as Borboletas
              </h2>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <Quote className="text-primary/60 w-8 h-8 flex-shrink-0 mt-1" />
                <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                  &ldquo;Viver como as Borboletas&rdquo; é uma coleção de poemas inspiradores que
                  celebram a leveza da alma e o renascimento espiritual.
                </p>
              </div>

              <p className="italic text-gray-600 dark:text-gray-400 max-w-lg">
                João Ferreira de Oliveira explora, através de imagens poéticas, o voo
                libertador do espírito e as pequenas grandes alegrias da vida.
              </p>

              <div className="flex flex-wrap gap-2 items-center">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  5.0 (12 avaliações)
                </span>
              </div>
            </div>

            <button
              onClick={handleVerLivro}
              className="group relative overflow-hidden px-8 py-4 bg-primary text-white rounded-xl hover:bg-primary/90 shadow-md hover:shadow-xl transition-all duration-300"
            >
              <span className="relative z-10 flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                <span>Ver Livro</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary-dark to-primary scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"></div>
            </button>
          </div>

          {/* 3D Model Column */}
          <div ref={modelRef} className="relative flex-shrink-0 w-full lg:w-auto">
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-primary/10 to-secondary/10 rounded-xl blur-md"></div>

              <div className="relative bg-white/80 dark:bg-gray-800/80 rounded-xl p-6 shadow-xl">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button className="absolute top-2 right-2 z-20 p-2 rounded-full bg-white/90 dark:bg-gray-700/90 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors shadow-sm">
                      <Info size={16} className="text-gray-500 dark:text-gray-300" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="max-w-xs">
                    <p>O modelo 3D é meramente ilustrativo em relação ao tamanho original do livro.</p>
                  </TooltipContent>
                </Tooltip>

                <model-viewer
                  src="/assets/livros/01 - Viver como as borboletas/viver-como-as-borboletas-hard-cover-glb.glb"
                  alt="Livro 3D animado"
                  camera-controls
                  environment-image="neutral"
                  auto-rotate
                  auto-rotate-delay="0"
                  shadow-intensity="1"
                  camera-orbit="0deg 75deg 105%"
                  style={{ width: "400px", height: "400px", borderRadius: "0.75rem", background: "transparent" }}
                />
              </div>
            </div>

            {/* Quote */}
            <div
              ref={quoteRef}
              className="mt-8 bg-white/80 dark:bg-gray-800/80 p-4 rounded-lg shadow-lg max-w-sm mx-auto lg:mx-0 lg:ml-auto"
            >
              <p className="text-sm italic text-gray-600 dark:text-gray-300">
                &ldquo;Como as borboletas, somos seres em constante transformação, buscando a leveza do voo e a beleza das cores que só a evolução espiritual pode proporcionar.&rdquo;
              </p>
              <p className="text-right text-xs font-medium text-gray-500 dark:text-gray-400 mt-2">
                — Trecho do livro
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
