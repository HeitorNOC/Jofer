import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  const cordelId = String(req.query.id)
  try {

    const cordelAtual = await prisma.cordel.findUnique({
      where: {
        id: cordelId
      },
      include: {
        comments: true
      }
    })

    return res.status(200).json(cordelAtual)
  } catch (e) {
    return res.status(500).json({ error: "Ocorreu um erro ao buscar o cordel." });

  }
    
    
}