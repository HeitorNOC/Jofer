"use client";
import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Pagination } from "@/components/pagination";

const categories = [
  "Amor e Fé",
  "Vida após a Morte",
  "Mediunidade",
  "Ética Espírita"
];

interface Cordel {
  id: string;
  title: string;
  subtitle: string;
  frontCoverUrl: string;
  backCoverUrl: string;
  category: string;
}

interface ListResponse {
  cordeis: Cordel[];
  totalPages: number;
  currentPage: number;
  totalCount: number;
}

async function fetchCordeis(
  page: number,
  category: string,
  search: string
): Promise<ListResponse> {
  const params = new URLSearchParams();
  params.set("page", page.toString());
  if (category) params.set("category", category);
  if (search) params.set("search", search);
  const res = await fetch(`/api/cordeis?${params.toString()}`);
  return res.json();
}

export default function CordeisPage() {
  const router = useRouter();
  const params = useSearchParams();
  const pageParam = Number(params.get("page") || "1");
  const initialCategory = params.get("category") || "";
  const initialSearch = params.get("search") || "";
  const [category, setCategory] = useState(initialCategory);
  const [search, setSearch] = useState(initialSearch);

  const { data, isLoading, isError } = useQuery<ListResponse>({
    queryKey: ["cordeis", pageParam, initialCategory, initialSearch],
    queryFn: () =>
      fetchCordeis(pageParam, initialCategory, initialSearch),
    staleTime: 5000
  });

  function applyFilters() {
    const qp = new URLSearchParams();
    qp.set("page", "1");
    if (category) qp.set("category", category);
    if (search) qp.set("search", search);
    router.push(`/cordeis?${qp.toString()}`);
  }

  function handlePageChange(idx: number) {
    const qp = new URLSearchParams();
    qp.set("page", (idx + 1).toString());
    if (category) qp.set("category", category);
    if (search) qp.set("search", search);
    router.push(`/cordeis?${qp.toString()}`);
  }

  if (isLoading) {
    return <div className="pt-24 text-center">Carregando...</div>;
  }
  if (isError || !data) {
    return <div className="pt-24 text-center">Erro ao carregar.</div>;
  }

  return (
    <div className="min-h-screen pt-24 px-6">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center">Cordéis</h1>

      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <select
          className="border rounded px-4 py-2"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Todas as categorias</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Buscar por nome"
          className="border rounded px-4 py-2 flex-1 min-w-[200px]"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          onClick={applyFilters}
        >
          Filtrar
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
        {data.cordeis.map((c) => (
          <div
            key={c.id}
            onClick={() => router.push(`/cordeis/${c.id}`)}
            className="group cursor-pointer rounded-lg overflow-hidden shadow-lg"
          >
            <div className="relative w-full aspect-[2/3] [perspective:1000px]">
              <div className="absolute inset-0 [transform-style:preserve-3d] transition-transform duration-700 group-hover:[transform:rotateY(180deg)]">
                <img
                  src={c.frontCoverUrl}
                  alt={c.title}
                  className="absolute inset-0 w-full h-full object-cover [backface-visibility:hidden]"
                />
                <img
                  src={c.backCoverUrl}
                  alt={c.title}
                  className="absolute inset-0 w-full h-full object-cover [backface-visibility:hidden] [transform:rotateY(180deg)]"
                />
              </div>
            </div>
            <div className="p-2 bg-transparent">
              <h2 className="text-sm sm:text-base font-semibold truncate">
                {c.title}
              </h2>
              <p className="text-xs text-gray-600 line-clamp-2">{c.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <Pagination
          pageIndex={data.currentPage - 1}
          perPage={8}
          totalCount={data.totalCount}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
