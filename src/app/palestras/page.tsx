// src/app/palestras/page.tsx
"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useEffect, useRef } from "react";
import { gsap, Power1 } from "gsap";
import { Pagination } from "@/components/pagination";

interface Palestra {
  id: string;
  title: string;
  date: string;
  summary: string;
  youtubeUrl: string;
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
  const sectionRef = useRef<HTMLDivElement>(null);

  const { data, isLoading, isError, error } = useQuery<ListResponse>({
    queryKey: ["palestras", pageParam],
    queryFn: () => fetchPalestras(pageParam),
    staleTime: 5000,
  });

  useEffect(() => {
    if (data && sectionRef.current) {
      const ctx = gsap.context(() => {
        gsap.from(sectionRef.current!.children, {
          opacity: 0,
          y: 20,
          duration: 0.8,
          ease: Power1.easeOut,
          stagger: 0.1,
        });
      }, sectionRef);
      return () => ctx.revert();
    }
  }, [data]);

  if (isLoading)
    return <p className="pt-24 text-center">Carregando palestras…</p>;
  if (isError)
    return (
      <p className="pt-24 text-center text-red-600">
        Erro: {error.message}
      </p>
    );
  if (!data || data.palestras.length === 0)
    return <p className="pt-24 text-center">Nenhuma palestra encontrada.</p>;

  const handlePageChange = (idx: number) => {
    router.push(`/palestras?page=${idx + 1}`);
  };

  const getYouTubeId = (url: string) =>
    url.match(/(?:youtu\.be\/|live\/|v=)([^?&]+)/)?.[1] ?? "";

  return (
    <div className="min-h-screen pt-24 px-6 lg:px-16 pb-8">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center">
        Palestras
      </h1>

      <div
        ref={sectionRef}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
      >
        {data.palestras.map((p) => {
          const vid = getYouTubeId(p.youtubeUrl);
          return (
            <div
              key={p.id}
              onClick={() => window.open(p.youtubeUrl, "_blank")}
              className="group cursor-pointer bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:shadow-xl hover:scale-105"
            >
              <div className="relative w-full aspect-video bg-black">
                <iframe
                  src={`https://www.youtube.com/embed/${vid}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
              <div className="p-4">
                <h2 className="text-base font-semibold mb-1 truncate">
                  {p.title}
                </h2>
                <time className="block text-sm text-muted-foreground mb-2">
                  {format(new Date(p.date), "dd 'de' MMMM yyyy", {
                    locale: ptBR,
                  })}
                </time>
                <p className="text-gray-700 text-sm line-clamp-3">
                  {p.summary}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 max-w-5xl mx-auto">
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
