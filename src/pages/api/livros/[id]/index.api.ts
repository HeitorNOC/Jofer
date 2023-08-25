import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == "GET") {
    const livroId = String(req.query.id)
    try {

      const livroAtual = await prisma.livro.findUnique({
        where: {
          id: livroId
        },
        include: {
          comments: {
            include: {
              user: true
            }
          }
        }
      })

      return res.status(200).json(livroAtual)
    } catch (e) {
      return res.status(500).json({ error: "Ocorreu um erro ao buscar o livro." });

    }
  } else if ( req.method == "POST") {
    try {

      const CreatelivroPostBody = z.object({
        comment: z.string(),
        userId: z.string(),
        livroId: z.string()
      })
      
      const { comment, userId, livroId } = CreatelivroPostBody.parse(req.body)
      
      await prisma.comment.create({
        data: {
          comment,
          livroId,
          userId
        }
      })
      
      return res.status(201).end()
    } catch (e) {
      return res.status(400).json({ message: "Falha ao publicar o comentário, tente novamente mais tarde" })
    }
  } else {

    return res.status(405).end();
  }

}