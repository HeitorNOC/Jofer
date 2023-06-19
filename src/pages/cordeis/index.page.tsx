import { api } from "@/lib/axios";
import { CordeisContainer, CordeisContent, CordeisOptions, Input, InputContainer, Label, OptionsLeft, OptionsRight, PaginationButton, Underline, } from "./styles";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { CaretLeft, CaretRight, MagnifyingGlass } from "@phosphor-icons/react";


const queryClient = new QueryClient();

async function fetchCordeis(page = 1) {
  const { data } = await api.get("/cordeis?page=" + page);
  return data;
}

export default function Cordeis() {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const { status, data, error, isFetching, isPreviousData } = useQuery({
    queryKey: ["cordeis", page],
    queryFn: () => fetchCordeis(page),
    keepPreviousData: true,
    staleTime: 5000,
  });

  // Prefetch the next page!
  useEffect(() => {
    if (!isPreviousData && data?.hasMore) {
      queryClient.prefetchQuery({
        queryKey: ["cordeis", page + 1],
        queryFn: () => fetchCordeis(page + 1),
      });
    }
  }, [data, isPreviousData, page, queryClient]);

  const filteredCordeis = data?.cordeis.filter((cordel: any) =>
    cordel.title.toLowerCase().includes(searchQuery.toLowerCase())
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
                Buscar por cordel
                </Label>
                <Underline className="underline" />
              </InputContainer>
            </OptionsRight>
          </CordeisOptions>
          <CordeisContent>
            {filteredCordeis?.map((cordel: any) => (
              // Renderizar os cordeis filtrados
              <div className="flip-card" key={cordel.id}>
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    <img src={cordel.frontCoverUrl} alt="" />
                  </div>
                  <div className="flip-card-back">
                    <img src={cordel.backCoverUrl} alt="" />
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
