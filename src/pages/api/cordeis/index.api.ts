import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method != 'GET') {
    return res.status(405).end()
  }

  const cordeis = await prisma.cordel.findMany({
    orderBy: {
      number: "asc"
    },
    select: {
      backCoverUrl: true,
      frontCoverUrl: true,
      id: true,
      comments: true,
      pdfUrl: true,
      number: true,
      subtitle: true,
      title: true,
      author: true
    }
  })

  return res.status(201).json(cordeis)
}