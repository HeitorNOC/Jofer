import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == "GET") {
    const cordelId = String(req.query.id)
    try {

      const cordelAtual = await prisma.cordel.findUnique({
        where: {
          id: cordelId
        },
        include: {
          comments: {
            include: {
              user: true
            }
          }
        }
      })

      return res.status(200).json(cordelAtual)
    } catch (e) {
      return res.status(500).json({ error: "Ocorreu um erro ao buscar o cordel." });

    }
  } else if ( req.method == "POST") {
    try {

      const CreateCordelPostBody = z.object({
        comment: z.string(),
        userId: z.string(),
        cordelId: z.string()
      })
      
      const { comment, userId, cordelId } = CreateCordelPostBody.parse(req.body)
      
      const postComment = await prisma.comment.create({
        data: {
          comment,
          cordelId,
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