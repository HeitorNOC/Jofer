import { api } from "@/lib/axios";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import {
  CardContainer,
  CommentContainer,
  CommentInput,
  CommentSection,
  CordelContainer,
  CordelMain,
  IconContainer,
  PdfIcon,
  RightSection,
  Subtitle,
  Thumbnail,
  ThumbnailImage,
  Title,
} from "./styles";
import { FilePdf } from "@phosphor-icons/react";
import { useSession } from "next-auth/react";


const queryClient = new QueryClient();

export default function Cordel() {
  const session = useSession()
  const router = useRouter();

  const { query } = router;
  const cordelId = query.id;
  async function fetchCordel() {
    const { data } = await api.get("/cordeis/" + cordelId);
    return data;
  }

  const { status, data, error, isFetching } = useQuery({
    queryKey: ["cordel"],
    queryFn: () => fetchCordel(),
  });

  const openPdf = (pdfLink: string) => {
    window.open(pdfLink, "_blank");
  };

  return (
    <CordelContainer>
      {data ? (
        <CordelMain>

          <CardContainer onClick={() => openPdf(data.pdfUrl)}>
            <IconContainer>
              <PdfIcon />
              <Title>{`${data.number} - ${data.title.toUpperCase()}`}</Title>
            </IconContainer>
            <Thumbnail>
              <ThumbnailImage src={"/" + data.frontCoverUrl} alt="image" fill style={{ objectFit: "cover" }} />
            </Thumbnail>
            <Subtitle>{data.subtitle}</Subtitle>
          </CardContainer>

          <RightSection>
            {session.data ? (
              <CommentSection>
                <h1>Comentários</h1>
                {
                  data.comments.length == 0 ? (
                    <CommentContainer>
                      <form action="">

                      <h1>Ainda não existem comentários, faça o primeiro:</h1>
                      <CommentInput>
                        <div className="form__group field">
                        <textarea className="form__field" placeholder="Name" />
                            <label htmlFor="name" className="form__label">Comentários</label>
                        </div>
                      </CommentInput>
                      </form>
                    </CommentContainer>
                  ) : (
                    data.comments.map((item: any) => (
                      <h1>{item.comment}</h1>
                    ))
                  )
                }
              </CommentSection>
            ) : (
              <CommentSection>
                <h1>Comentários</h1>
                {
                  data.comments.length == 0 ? (
                    <h1>Ainda não existem comentários, Faça Login para adicionar um comentário!</h1>
                  ) : (
                    data.comments.map((item: any) => (
                      <h1>{item.comment}</h1>
                    ))
                  )
                }
              </CommentSection>
            )}
          </RightSection>
        </CordelMain>
      ) : (
        <h1>Carregando...</h1>
      )
      }
    </CordelContainer >
  );
}