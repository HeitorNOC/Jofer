import { api } from "@/lib/axios";
import { CordeisContainer, CordeisContent, CordeisOptions, Input, InputContainer, Label, OptionsLeft, OptionsRight, PaginationButton, Underline, } from "./styles";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { useRouter } from "next/router";


const queryClient = new QueryClient();



export default function Livros() {
  const router = useRouter()
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  async function fetchLivros(page = 1) {
    await router.push("/livros?page=" + page)
    const { data } = await api.get("/livros?page=" + page);
    return data;
  
  
  }
  

  const { status, data, error, isFetching, isPreviousData } = useQuery({
    queryKey: ["livros", page],
    queryFn: () => fetchLivros(page),
    staleTime: 5000,
    keepPreviousData: true
  });

  // Prefetch the next page!
   useEffect(() => {
    if (!isPreviousData && data?.hasMore) {
      queryClient.prefetchQuery({
        queryKey: ["livros", page + 1],
        queryFn: () => fetchLivros(page + 1),
      });
    }
  }, [data, isPreviousData, page, queryClient]); 

  const filteredLivros = data?.livros.filter((livro: any) =>
    livro.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  function handlePrev() {
    if (page != 1) {
      setPage((prev) => prev - 1)
    }
  }

  function handleNext() {
    if (page != data.totalPages) {
      setPage((prev) => prev + 1)
    }
  }

  async function handleLivrosSelected(id: String) {
    await router.push(`livros/${id}`)
  }

  return (
    <>
      {data !== undefined ? (
        <CordeisContainer>
          <CordeisOptions>
            <OptionsLeft>
              <CaretLeft size={24} style={{ cursor: "pointer", marginRight: 8 }} onClick={handlePrev} color="#fff" weight="bold"/>
              {Array.from({ length: data.totalPages }, (_, index) => (
                <PaginationButton
                  key={index + 1}
                  onClick={() => setPage(index + 1)}
                  className={page === index + 1 ? "active" : ""}
                >
                  {index + 1}
                </PaginationButton>
              ))}
              <CaretRight size={24} style={{ cursor: "pointer" }} onClick={handleNext} color="#fff" weight="bold"/>
            </OptionsLeft>
            <OptionsRight>
              <InputContainer>
                <Input
                  type="text"
                  id="input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Label htmlFor="input" className="label">
                Buscar por livro
                </Label>
                <Underline className="underline" />
              </InputContainer>
            </OptionsRight>
          </CordeisOptions>
          <CordeisContent>
            {filteredLivros?.map((livro: any) => (
              // Renderizar os cordeis filtrados
              <div className="flip-card" key={livro.id} onClick={() => handleLivrosSelected(livro.id)}>
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    <img src={livro.frontCoverUrl} alt="" />
                  </div>
                  <div className="flip-card-back">
                    <img src={livro.backCoverUrl} alt="" />
                  </div>
                </div>
              </div>
            ))}
          </CordeisContent>
        </CordeisContainer>
      ) : (
        <h1>carregando...</h1>
      )}
    </>
  );
}
