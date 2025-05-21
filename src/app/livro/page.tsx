"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, Loader2, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function LivroPage() {
  const router = useRouter();
  const modelRef = useRef<any>(null);
  const [loaded, setLoaded] = useState(false);
  const [modelRotation, setModelRotation] = useState(0);
  const [showDetails, setShowDetails] = useState(false);

  // Load the model viewer component
  useEffect(() => {
    import("@google/model-viewer").catch(console.error);
  }, []);

  // Handle model loading state
  useEffect(() => {
    const mv = modelRef.current;
    if (mv) {
      const onLoad = () => setLoaded(true);
      mv.addEventListener("load", onLoad);
      return () => mv.removeEventListener("load", onLoad);
    }
  }, [modelRef.current]);

  // Auto-rotate the model slightly on load for better visibility
  useEffect(() => {
    if (loaded) {
      const timer = setTimeout(() => {
        setModelRotation(30);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [loaded]);

  const buyOnWhatsapp = () => {
    const text = encodeURIComponent(
      `Olá, tenho interesse no livro "Viver como as Borboletas"`
    );
    window.open(`https://wa.me/5581996213652?text=${text}`, "_blank");
  };

  // Book details
  const bookDetails = {
    title: "Viver como as Borboletas",
    author: "João Ferreira de Oliveira",
    year: "2023",
    pages: "120",
    language: "Português",
    isbn: "978-65-00-XXXXX-X",
    price: "R$ 39,90",
    description: `"Viver como as Borboletas" é uma coletânea de poemas que celebra a leveza e o renascimento espiritual, inspirando o leitor a enxergar beleza nas pequenas alegrias. Explore imagens poéticas que falam ao coração e convidam à reflexão sobre o voo libertador da alma.`,
    highlights: [
      "Poemas inspiradores sobre transformação espiritual",
      "Reflexões sobre a leveza do ser e a beleza da vida",
      "Mensagens de esperança e renovação",
      "Linguagem acessível e profunda"
    ]
  };

  return (
    <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8 pb-16 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            className="flex items-center gap-2 hover:bg-transparent hover:text-primary transition-colors"
            onClick={() => router.push("/")}
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Voltar para Início</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* 3D Model Viewer */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-md aspect-square rounded-xl overflow-hidden shadow-xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
              {!loaded && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm z-10">
                  <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                  <p className="text-sm text-muted-foreground">Carregando modelo 3D...</p>
                </div>
              )}
              <model-viewer
                ref={modelRef}
                src="/assets/livros/01 - Viver como as borboletas/viver-como-as-borboletas-hard-cover-glb.glb"
                alt="Livro 3D Viver como as Borboletas"
                camera-controls
                environment-image="neutral"
                shadow-intensity="1"
                camera-orbit={`${modelRotation}deg 75deg 105%`}
                min-camera-orbit="auto 0deg auto"
                max-camera-orbit="auto 180deg 150%"
                interaction-prompt="none"
                style={{ width: "100%", height: "100%" }}
                className="w-full h-full"
              />
              {loaded && (
                <div className="absolute bottom-4 left-0 right-0 text-center text-white text-sm bg-black/30 backdrop-blur-sm py-1 rounded-md mx-4">
                  Interaja com o modelo 3D
                </div>
              )}
            </div>
          </div>

          {/* Book Content */}
          <div className="flex flex-col">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <h1 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600 dark:from-primary dark:to-blue-400">
                {bookDetails.title}
              </h1>

              <p className="text-xl text-muted-foreground mt-2">
                por {bookDetails.author}
              </p>

              <div className="flex items-center mt-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={cn(
                      "h-5 w-5",
                      star <= 5 ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                    )}
                  />
                ))}
                <span className="ml-2 text-sm text-muted-foreground">5.0 (12 avaliações)</span>
              </div>

              <div className="mt-6 prose dark:prose-invert max-w-none">
                <p className="text-lg">{bookDetails.description}</p>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4 sm:items-center">
                <span className="text-3xl font-bold text-primary">{bookDetails.price}</span>
                <Button
                  onClick={buyOnWhatsapp}
                  className="bg-green-600 hover:bg-green-700 text-white gap-2"
                >
                  <svg viewBox="0 0 16 16" className="w-4 h-4">
                    <path
                      fill="currentColor"
                      d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"
                    />
                  </svg>
                  Comprar via WhatsApp
                </Button>
              </div>

              <div className="mt-8">
                <Button
                  variant="outline"
                  onClick={() => setShowDetails(!showDetails)}
                  className="flex items-center gap-2"
                >
                  <BookOpen className="h-4 w-4" />
                  {showDetails ? "Ocultar detalhes" : "Ver detalhes do livro"}
                </Button>

                {showDetails && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 bg-gray-50 dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-800"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Ano de publicação</h3>
                        <p>{bookDetails.year}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Páginas</h3>
                        <p>{bookDetails.pages}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Idioma</h3>
                        <p>{bookDetails.language}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">ISBN</h3>
                        <p>{bookDetails.isbn}</p>
                      </div>
                    </div>

                    <div className="mt-4">
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">Destaques</h3>
                      <ul className="space-y-1">
                        {bookDetails.highlights.map((highlight, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-primary mr-2">•</span>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
