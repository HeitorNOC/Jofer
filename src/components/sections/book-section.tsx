'use client'

import { gsap, Power1 } from 'gsap'
import { Info } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'

export function BookSection() {
  const router = useRouter()
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current!.children, {
        opacity: 0, y: 40, duration: 1, ease: Power1.easeOut, stagger: 0.2
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    import('@google/model-viewer')
      .catch(err => console.error('ModelViewer load failed', err))
  }, [])

  const handleVerLivro = () => router.push('/livros')

  return (
    <section
      ref={sectionRef}
      className="
        flex flex-col md:flex-row items-center justify-between
        min-h-screen px-6 md:px-20 py-16
        bg-background text-foreground
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
        <p className="italic text-muted-foreground max-w-md">
          João Ferreira de Oliveira explora, através de imagens poéticas, o voo
          libertador do espírito e as pequenas grandes alegrias da vida.
        </p>
        <button
          onClick={handleVerLivro}
          className="
            inline-block px-8 py-3 bg-primary text-primary-foreground rounded-full
            hover:bg-background hover:text-primary border-2 border-primary
            transition-colors duration-300 cursor-pointer
          "
        >
          Ver Livro
        </button>
      </div>

      <div className="relative flex-shrink-0 mt-8 md:mt-0">
        <Tooltip>
          <TooltipTrigger asChild>
            <button className="absolute top-0 right-0 mr-2 z-20 p-1 rounded-full hover:bg-muted transition-colors">
              <Info size={18} className="text-muted-foreground" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="top">
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
          style={{ width: "500px", height: "500px" }}
        />
      </div>
    </section>
  )
}
