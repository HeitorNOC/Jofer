import { api } from "@/lib/axios";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import {
  CardContainer,
  CommentBox,
  CommentContainer,
  CommentDiv,
  CommentInput,
  CommentSection,
  CordelContainer,
  CordelMain,
  FormError,
  IconContainer,
  LeftBox,
  PdfIcon,
  RightBox,
  RightSection,
  Subtitle,
  Thumbnail,
  ThumbnailImage,
  Title,
} from "./styles";
import { FilePdf } from "@phosphor-icons/react";
import { useSession } from "next-auth/react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

const commentSchema = z.object({
  comment: z
    .string().min(2, {
      message: "O comentário deve ter pelo menos 2 caracteres."
    })
    .refine((value) => !hasProfanity(value), {
      message: "O comentário contém palavras proibidas",
    }),
});

type CommentFormData = z.infer<typeof commentSchema>

const queryClient = new QueryClient();

const hasProfanity = (text: string): boolean => {
  const forbiddenWords = ["palavrão1", "palavrão2", "palavrão3"];
  const words = text.split(" ");
  return words.some((word) => forbiddenWords.includes(word.toLowerCase()));
};

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

  const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm<CommentFormData>({
    resolver: zodResolver(commentSchema)
  })

  const openPdf = (pdfLink: string) => {
    window.open(pdfLink, "_blank");
  };


  async function handleConfirmComment(data: CommentFormData) {
    const { comment } = data

    await api.post(`/cordeis/${cordelId}`, {
      comment,
      userId: session.data?.user.id,
      cordelId
    })

    router.reload()
  }


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
                      <form onSubmit={handleSubmit(handleConfirmComment)}>

                        <h1>Ainda não existem comentários, faça o primeiro!</h1>
                        <CommentInput>
                          <div className="form__group field">
                            <textarea className="form__field" placeholder="Name" {...register('comment')} />
                            <label htmlFor="name" className="form__label">Comentário</label>
                          </div>
                        </CommentInput>
                        {errors.comment && (
                          <FormError>{errors.comment.message}</FormError>
                        )}
                        <button disabled={isSubmitting} type="submit" className="btn">Comentar</button>
                      </form>
                    </CommentContainer>
                  ) : (
                    <CommentContainer>
                      <form onSubmit={handleSubmit(handleConfirmComment)}>
                        <CommentInput>
                          <div className="form__group field">
                            <textarea className="form__field" placeholder="Name" {...register('comment')} />
                            <label htmlFor="name" className="form__label">Comentar</label>
                          </div>
                        </CommentInput>
                        {errors.comment && (
                          <FormError>{errors.comment.message}</FormError>
                        )}
                        <button disabled={isSubmitting} type="submit" className="btn">Comentar</button>
                      </form>
                      <h1>Outros Comentários</h1>
                      <CommentDiv>
                      {data.comments.map((item: any) => (
                          <CommentBox>
                            <LeftBox>
                              <div>
                                <Image src={item.user.avatar_url} alt="Avatar" width={50} height={50} style={{ borderRadius: 999 }} />

                              </div>
                              <div>
                                <h4>{item.user.name}</h4>
                                <p>{formatDistanceToNow(new Date(item.createdAt), { locale: ptBR, addSuffix: true })}</p>
                              </div>
                            </LeftBox>
                            <RightBox>
                              <p>{item.comment}</p>
                            </RightBox>
                          </CommentBox>
                      ))}
                      </CommentDiv>
                    </CommentContainer>
                  )
                }
              </CommentSection>
            ) : (
              <CommentSection>
                 <h1>Comentários</h1>
                {
                  data.comments.length == 0 ? (
                    <CommentContainer>
                      <form onSubmit={handleSubmit(handleConfirmComment)}>

                        <h1>Ainda não existem comentários, faça o primeiro!</h1>
                        <CommentInput>
                          <div className="form__group field">
                            <textarea className="form__field" placeholder="Name" {...register('comment')} />
                            <label htmlFor="name" className="form__label">Faça Login para comentar.</label>
                          </div>
                        </CommentInput>
                        {errors.comment && (
                          <FormError>{errors.comment.message}</FormError>
                        )}
                        <button disabled type="submit" className="btn" style={{ cursor: "not-allowed" }}>Comentar</button>
                      </form>
                    </CommentContainer>
                  ) : (
                    <CommentContainer>
                      <form onSubmit={handleSubmit(handleConfirmComment)}>
                        <CommentInput>
                          <div className="form__group field">
                            <textarea className="form__field" placeholder="Name" {...register('comment')} />
                            <label htmlFor="name" className="form__label">Faça Login para comentar.</label>
                          </div>
                        </CommentInput>
                        {errors.comment && (
                          <FormError>{errors.comment.message}</FormError>
                        )}
                        <button disabled type="submit" className="btn" style={{ cursor: "not-allowed" }}>Comentar</button>
                      </form>
                      <h1>Outros Comentários</h1>
                      <CommentDiv>
                      {data.comments.map((item: any) => (
                          <CommentBox>
                            <LeftBox>
                              <div>
                                <Image src={item.user.avatar_url} alt="Avatar" width={50} height={50} style={{ borderRadius: 999 }} />

                              </div>
                              <div>
                                <h4>{item.user.name}</h4>
                                <p>{formatDistanceToNow(new Date(item.createdAt), { locale: ptBR, addSuffix: true })}</p>
                              </div>
                            </LeftBox>
                            <RightBox>
                              <p>{item.comment}</p>
                            </RightBox>
                          </CommentBox>
                      ))}
                      </CommentDiv>
                    </CommentContainer>
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