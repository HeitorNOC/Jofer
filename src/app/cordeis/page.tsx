"use client";
import { Pagination } from "@/components/pagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { BookOpen, Filter, Loader2, Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

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
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const { data, isLoading, isError } = useQuery<ListResponse>({
    queryKey: ["cordeis", pageParam, initialCategory, initialSearch],
    queryFn: () => fetchCordeis(pageParam, initialCategory, initialSearch),
    staleTime: 5000
  });

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Press Enter when search is focused to apply filters
      if (e.key === "Enter" && isSearchFocused) {
        applyFilters();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchFocused, search, category]);

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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300 } }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 flex flex-col items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-lg text-muted-foreground">Carregando cordéis...</p>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="min-h-screen pt-24 flex flex-col items-center justify-center text-red-500">
        <p className="text-lg">Erro ao carregar os cordéis.</p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => router.refresh()}
        >
          Tentar novamente
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600 dark:from-primary dark:to-blue-400">
          Cordéis
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore nossa coleção de literatura de cordel espírita, unindo tradição popular e espiritualidade.
        </p>
      </motion.div>

      <div className="bg-white/80 dark:bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 shadow-md border border-gray-300 dark:border-gray-800 mb-10">
        <div className="flex flex-col sm:flex-row gap-4 items-end">
          <div className="w-full sm:w-auto flex-1">
            <label className="text-sm font-medium mb-2 block text-muted-foreground">
              Categoria
            </label>
            <select
              className="w-full bg-background border border-input rounded-md h-10 px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
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
          </div>

          <div className="w-full sm:w-auto flex-1">
            <label className="text-sm font-medium mb-2 block text-muted-foreground">
              Buscar
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar por título..."
                className="pl-9 w-full"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
            </div>
          </div>

          <Button
            className="w-full sm:w-auto gap-2"
            onClick={applyFilters}
          >
            <Filter className="h-4 w-4" />
            Filtrar
          </Button>
        </div>
      </div>

      {data.cordeis.length === 0 ? (
        <div className="text-center py-12">
          <BookOpen className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-medium mb-2">Nenhum cordel encontrado</h3>
          <p className="text-muted-foreground">
            Tente ajustar seus filtros ou buscar por outro termo.
          </p>
        </div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-12"
        >
          {data.cordeis.map((cordel) => (
            <motion.div
              key={cordel.id}
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              onClick={() => router.push(`/cordeis/${cordel.id}`)}
              className={cn(
                "group cursor-pointer rounded-xl overflow-hidden shadow-md hover:shadow-xl",
                "bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700",
                "transition-all duration-300"
              )}
            >
              <div className="relative w-full aspect-[2/3] [perspective:1000px]">
                <div className="absolute inset-0 [transform-style:preserve-3d] transition-transform duration-700 group-hover:[transform:rotateY(180deg)]">
                  <img
                    src={cordel.frontCoverUrl}
                    alt={cordel.title}
                    className="absolute inset-0 w-full h-full object-cover [backface-visibility:hidden] rounded-t-xl"
                    loading="lazy"
                  />
                  <img
                    src={cordel.backCoverUrl}
                    alt={cordel.title}
                    className="absolute inset-0 w-full h-full object-cover [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-t-xl"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="p-4">
                <h2 className="text-base font-semibold truncate group-hover:text-primary transition-colors">
                  {cordel.title}
                </h2>
                <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                  {cordel.subtitle}
                </p>
                <div className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                  {cordel.category}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      <div className="mt-8 mb-16 flex justify-center">
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
