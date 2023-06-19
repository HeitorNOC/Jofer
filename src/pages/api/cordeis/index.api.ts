import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  const page = Number(req.query.page); // Converter a página para um número
  const pageSize = 8; // Número de itens por página
  const skip = (page - 1) * pageSize; // Calcular o número de itens a serem pulados

  try {
    const totalCordeis = await prisma.cordel.count(); // Obter o número total de cordeis
    const totalPages = Math.ceil(totalCordeis / pageSize); // Calcular o número total de páginas

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
      },
      skip: skip, // Pular os itens anteriores à página atual
      take: pageSize // Obter apenas a quantidade de itens desejada
    });

    return res.status(200).json({
      totalPages: totalPages,
      currentPage: page,
      cordeis: cordeis
    });
  } catch (error) {
    return res.status(500).json({ error: "Ocorreu um erro ao buscar os cordeis." });
  }
}