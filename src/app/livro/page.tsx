"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function LivroPage() {
  const router = useRouter();
  const modelRef = useRef<any>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    import("@google/model-viewer").catch(console.error);
  }, []);

  useEffect(() => {
    const mv = modelRef.current;
    if (mv) {
      const onLoad = () => setLoaded(true);
      mv.addEventListener("load", onLoad);
      return () => mv.removeEventListener("load", onLoad);
    }
  }, [modelRef.current]);

  const buyOnWhatsapp = () => {
    const text = encodeURIComponent(
      `Olá, tenho interesse no livro "Viver como as Borboletas"`
    );
    window.open(`https://wa.me/5581996213652?text=${text}`, "_blank");
  };

  return (
    <div className="pt-20 px-4 sm:px-6 lg:px-16 pb-8">
      <header className="max-w-4xl mx-auto mb-6 flex items-center justify-between">
        <h1 className="text-3xl sm:text-4xl font-bold">Viver como as Borboletas</h1>
        <Button variant="link" onClick={() => router.push("/")}>
          ← Voltar
        </Button>
      </header>

      <div className="flex flex-col lg:flex-row items-start gap-8 max-w-4xl mx-auto">
        <div className="relative w-full lg:w-1/2 flex justify-center">
          {!loaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/50 z-10">
              <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full" />
            </div>
          )}
          <model-viewer
            ref={modelRef}
            src="/assets/livros/01 - Viver como as borboletas/viver-como-as-borboletas-hard-cover-glb.glb"
            alt="Livro 3D Viver como as Borboletas"
            camera-controls
            environment-image="neutral"
            auto-rotate
            auto-rotate-delay="0"
            style={{ width: "500px", height: "500px" }}
          />
        </div>
        <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-4">
          <p className="text-lg md:text-xl">
            “Viver como as Borboletas” é uma coletânea de poemas de João Ferreira de Oliveira
            que celebra a leveza e o renascimento espiritual, inspirando o leitor a enxergar
            beleza nas pequenas alegrias.
          </p>
          <p className="italic text-muted-foreground">
            Explore imagens poéticas que falam ao coração e convidam à reflexão sobre o voo
            libertador da alma.
          </p>
          <button className="Btn self-start" onClick={buyOnWhatsapp}>
            <div className="sign">
              <svg viewBox="0 0 16 16" className="w-5 h-5">
                <path
                  fill="white"
                  d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"
                />
              </svg>
            </div>
            <div className="text">WhatsApp</div>
          </button>
        </div>
      </div>

      <style jsx>{`
        .Btn {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          width: 45px;
          height: 45px;
          border: none;
          border-radius: 50%;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: 0.3s;
          box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
          background-color: #00d757;
        }
        .sign {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: 0.3s;
        }
        .text {
          position: absolute;
          right: 0;
          width: 0;
          opacity: 0;
          color: white;
          font-size: 1em;
          font-weight: 600;
          transition: 0.3s;
          white-space: nowrap;
        }
        .Btn:hover {
          width: 140px;
          border-radius: 40px;
        }
        .Btn:hover .sign {
          width: 30%;
          padding-left: 8px;
        }
        .Btn:hover .text {
          opacity: 1;
          width: 70%;
          padding-right: 8px;
        }
        .Btn:active {
          transform: translate(2px, 2px);
        }
      `}</style>
    </div>
  );
}
