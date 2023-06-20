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
  FormError,
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
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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

    console.log(comment)
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
                <h1>Comentários:</h1>
                {
                  data.comments.length == 0 ? (
                    <CommentContainer>
                      <form onSubmit={handleSubmit(handleConfirmComment)}>

                        <h1>Ainda não existem comentários, faça o primeiro!</h1>
                        <CommentInput>
                          <div className="form__group field">
                            <textarea className="form__field" placeholder="Name" {...register('comment')}/>
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