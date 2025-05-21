"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ArrowLeft, Loader2, Share2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Cordel {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  frontCoverUrl: string;
  backCoverUrl: string;
  pdfUrl: string;
  category: string;
}

async function fetchCordel(id: string): Promise<Cordel> {
  const res = await fetch(`/api/cordeis/${id}`);
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.error || res.statusText);
  }
  return res.json();
}

export default function CordelDetailPage() {
  const router = useRouter();
  const { id } = useParams();
  const [isFlipped, setIsFlipped] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);

  // Get the cordel ID safely for the query
  const cordelId = id as string;

  // Use the query hook (must be called unconditionally)
  const { data, isLoading, isError, error } = useQuery<Cordel, Error>({
    queryKey: ["cordel", cordelId],
    queryFn: () => fetchCordel(cordelId),
    // Skip the query if there's no ID
    enabled: !!cordelId,
  });

  // Reset flip state when navigating between cordels
  useEffect(() => {
    setIsFlipped(false);
    setShowShareOptions(false);
  }, [id]);

  if (!id) {
    return (
      <div className="min-h-screen pt-24 flex flex-col items-center justify-center text-red-600">
        <h2 className="text-2xl font-bold mb-4">Cordel não encontrado</h2>
        <Button variant="outline" onClick={() => router.push("/cordeis")}>
          Voltar para Cordéis
        </Button>
      </div>
    );
  }

  const buyOnWhatsapp = () => {
    if (!data) return;
    const text = encodeURIComponent(`Olá, tenho interesse no cordel "${data.title}"`);
    window.open(`https://wa.me/5581996213652?text=${text}`, "_blank");
  };

  const handleShare = async () => {
    if (!data) return;

    if (navigator.share) {
      try {
        await navigator.share({
          title: data.title,
          text: `Confira este cordel: ${data.title}`,
          url: window.location.href,
        });
      } catch (err) {
        setShowShareOptions(!showShareOptions);
      }
    } else {
      setShowShareOptions(!showShareOptions);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowShareOptions(false);
    // Could add a toast notification here
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 flex flex-col items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-lg text-muted-foreground">Carregando cordel...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen pt-24 flex flex-col items-center justify-center text-red-600">
        <p className="text-lg mb-4">Erro: {error.message}</p>
        <Button variant="outline" onClick={() => router.push("/cordeis")}>
          Voltar para Cordéis
        </Button>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen pt-24 flex flex-col items-center justify-center">
        <p className="text-lg mb-4">Nenhum dado disponível.</p>
        <Button variant="outline" onClick={() => router.push("/cordeis")}>
          Voltar para Cordéis
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8 pb-16 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <Button
            variant="ghost"
            className="flex items-center gap-2 hover:bg-transparent hover:text-primary transition-colors"
            onClick={() => router.push("/cordeis")}
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Voltar para Cordéis</span>
          </Button>

          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={handleShare}
            >
              <Share2 className="h-5 w-5" />
            </Button>

            {showShareOptions && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10 border border-gray-200 dark:border-gray-700">
                <div className="p-2">
                  <button
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md flex items-center gap-2"
                    onClick={copyToClipboard}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                    Copiar link
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md flex items-center gap-2 text-green-600 dark:text-green-400"
                    onClick={buyOnWhatsapp}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"></path>
                      <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"></path>
                    </svg>
                    Compartilhar no WhatsApp
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Cover Image with Flip Effect */}
          <div className="flex justify-center">
            <motion.div
              className="relative w-full max-w-md aspect-[2/3] [perspective:1000px] cursor-pointer"
              onClick={() => setIsFlipped(!isFlipped)}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div
                className={cn(
                  "absolute inset-0 [transform-style:preserve-3d] transition-transform duration-700 rounded-xl shadow-2xl",
                  isFlipped ? "[transform:rotateY(180deg)]" : ""
                )}
              >
                <img
                  src={encodeURI(`/${data.frontCoverUrl}`)}
                  alt={`Capa frontal de ${data.title}`}
                  className="absolute inset-0 w-full h-full object-cover rounded-xl [backface-visibility:hidden]"
                />
                <img
                  src={encodeURI(`/${data.backCoverUrl}`)}
                  alt={`Contracapa de ${data.title}`}
                  className="absolute inset-0 w-full h-full object-cover rounded-xl [backface-visibility:hidden] [transform:rotateY(180deg)]"
                />
              </div>
              <div className="absolute bottom-4 left-0 right-0 text-center text-white text-sm bg-black/30 backdrop-blur-sm py-1 rounded-md mx-4">
                Clique para {isFlipped ? "ver a capa" : "ver a contracapa"}
              </div>
            </motion.div>
          </div>

          {/* Content */}
          <div className="flex flex-col">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <h1 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600 dark:from-primary dark:to-blue-400">
                {data.title}
              </h1>

              <div className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                {data.category}
              </div>

              <h2 className="text-xl text-muted-foreground mt-4">
                {data.subtitle}
              </h2>

              {data.description && (
                <div className="mt-6 prose dark:prose-invert max-w-none">
                  <p>{data.description}</p>
                </div>
              )}

              <div className="mt-8 space-y-4">
                <h3 className="text-lg font-medium">Adquira este cordel</h3>
                <p className="text-muted-foreground">
                  Você pode adquirir o PDF deste cordel por um valor simbólico. Entre em contato via WhatsApp para mais informações.
                </p>

                <div className="flex flex-wrap gap-4 mt-6">
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
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
