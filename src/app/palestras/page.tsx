// src/app/palestras/page.tsx
"use client";
import { Pagination } from "@/components/pagination";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { gsap, Power1 } from "gsap";
import { Calendar, Clock, ExternalLink, Filter, Play, Search, Tag, Video } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface Palestra {
  id: string;
  title: string;
  date: string;
  summary: string;
  youtubeUrl: string;
  tags?: string[];
  duration?: string;
}

interface ListResponse {
  palestras: Palestra[];
  meta: {
    pageIndex: number;
    perPage: number;
    totalCount: number;
  };
}

async function fetchPalestras(page: number): Promise<ListResponse> {
  const res = await fetch(`/api/palestras?page=${page}`);
  if (!res.ok) throw new Error("Falha ao carregar palestras");
  return res.json();
}

export default function PalestrasPage() {
  const router = useRouter();
  const params = useSearchParams();
  const pageParam = Number(params.get("page") || "1");
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const { data, isLoading, isError, error } = useQuery<ListResponse>({
    queryKey: ["palestras", pageParam],
    queryFn: () => fetchPalestras(pageParam),
    staleTime: 5000,
  });

  // Simple animation setup without ScrollTrigger
  useEffect(() => {
    if (!headerRef.current) return;

    // Header animations
    const headerElements = headerRef.current.querySelectorAll('*');
    gsap.fromTo(
      headerElements,
      { opacity: 0, y: -20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: Power1.easeOut
      }
    );

    return () => {
      gsap.killTweensOf(headerElements);
    };
  }, []);

  // Animate content when data changes
  useEffect(() => {
    if (!contentRef.current || !data?.palestras) return;

    // Get all cards
    const cards = contentRef.current.querySelectorAll('.palestra-card');

    // Reset any existing animations
    gsap.set(cards, { clearProps: "all" });

    // Animate cards
    gsap.fromTo(
      cards,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: Power1.easeOut,
        onComplete: () => {
          // Ensure everything is visible after animation
          gsap.set(cards, { clearProps: "opacity,y" });
        }
      }
    );

    return () => {
      gsap.killTweensOf(cards);
    };
  }, [data]);

  const handlePageChange = (idx: number) => {
    setActiveVideo(null);
    router.push(`/palestras?page=${idx + 1}`);
  };

  const getYouTubeId = (url: string) =>
    url.match(/(?:youtu\.be\/|live\/|v=)([^?&]+)/)?.[1] ?? "";

  const handlePlayVideo = (videoId: string) => {
    setActiveVideo(videoId === activeVideo ? null : videoId);
  };

  // Filter palestras based on search term
  const filteredPalestras = data?.palestras?.filter(p =>
    searchTerm ? p.title.toLowerCase().includes(searchTerm.toLowerCase()) : true
  ) || [];

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 px-6 lg:px-16 pb-8 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300">Carregando palestras...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen pt-24 px-6 lg:px-16 pb-8 flex items-center justify-center">
        <div className="max-w-md text-center p-8 bg-red-50 dark:bg-red-900/20 rounded-xl shadow-md">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-red-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-red-700 dark:text-red-400 mb-2">Erro ao carregar palestras</h2>
          <p className="text-red-600 dark:text-red-300">{error.message}</p>
          <button
            onClick={() => router.refresh()}
            className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  if (!data || filteredPalestras?.length === 0) {
    return (
      <div className="min-h-screen pt-24 px-6 lg:px-16 pb-8">
        <div ref={headerRef} className="max-w-5xl mx-auto mb-12 space-y-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 mb-4">
              Palestras
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Assista às palestras espíritas ministradas por João Ferreira em diversos centros e congressos pelo Brasil.
            </p>
          </div>

          <div className="relative max-w-md mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Buscar palestras..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>
        </div>

        <div className="max-w-md mx-auto text-center p-12 bg-gray-50 dark:bg-gray-800/50 rounded-xl shadow-md">
          <Video className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-2">
            {searchTerm ? "Nenhuma palestra encontrada" : "Nenhuma palestra disponível"}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {searchTerm
              ? `Não encontramos palestras com o termo "${searchTerm}". Tente uma busca diferente.`
              : "No momento não há palestras disponíveis. Volte em breve para novidades."}
          </p>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="mt-4 px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors"
            >
              Limpar busca
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 px-6 lg:px-16 pb-16">
      {/* Header Section */}
      <div ref={headerRef} className="max-w-5xl mx-auto mb-12 space-y-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 mb-4">
            Palestras
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Assista às palestras espíritas ministradas por João Ferreira em diversos centros e congressos pelo Brasil.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
          {/* Search */}
          <div className="relative w-full sm:w-80">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Buscar palestras..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>

          {/* Filter Button - For future implementation */}
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/80 transition-colors">
            <Filter className="w-4 h-4" />
            <span>Filtrar</span>
          </button>
        </div>

        {/* Results count */}
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Mostrando {filteredPalestras.length} de {data.meta.totalCount} palestras
        </div>
      </div>

      {/* Content Section */}
      <div
        ref={contentRef}
        className="max-w-5xl mx-auto space-y-8"
      >
        {filteredPalestras.map((p) => {
          const vid = getYouTubeId(p.youtubeUrl);
          return (
            <div
              key={p.id}
              className="palestra-card bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group border border-gray-300 dark:border-gray-700"
            >
              <div className="flex flex-col md:flex-row">
                {/* Video Thumbnail */}
                <div className="w-full md:w-2/5 relative">
                  <div className="relative aspect-video md:h-full">
                    {activeVideo === vid ? (
                      <iframe
                        src={`https://www.youtube.com/embed/${vid}?autoplay=1`}
                        title={p.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute inset-0 w-full h-full"
                      />
                    ) : (
                      <>
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <button
                            onClick={() => handlePlayVideo(vid)}
                            className="w-16 h-16 bg-primary/90 hover:bg-primary rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110"
                            aria-label="Play video"
                          >
                            <Play className="w-8 h-8 text-white fill-white ml-1" />
                          </button>
                        </div>
                        <img
                          src={`https://img.youtube.com/vi/${vid}/maxresdefault.jpg`}
                          alt={p.title}
                          className="w-full h-full object-cover"
                        />
                      </>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="w-full md:w-3/5 p-6 flex flex-col">
                  <div className="flex-1">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {p.tags?.map(tag => (
                        <span key={tag} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                          <Tag className="w-3 h-3 mr-1" />
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {p.title}
                    </h2>

                    <p className="text-gray-600 dark:text-gray-300 line-clamp-3 mb-4">
                      {p.summary}
                    </p>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        <time>
                          {format(new Date(p.date), "dd 'de' MMMM yyyy", {
                            locale: ptBR,
                          })}
                        </time>
                      </div>

                      {p.duration && (
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          <span>{p.duration}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <a
                      href={p.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
                    >
                      <span>Assistir no YouTube</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      <div className="mt-12 mb-16 max-w-5xl mx-auto">
        <Pagination
          pageIndex={data.meta.pageIndex}
          perPage={data.meta.perPage}
          totalCount={data.meta.totalCount}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
