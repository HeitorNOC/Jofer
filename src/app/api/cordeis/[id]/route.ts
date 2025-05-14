// src/app/api/cordeis/[id]/route.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const idInt = parseInt(id, 10);
  if (isNaN(idInt)) {
    return new Response(
      JSON.stringify({ error: "ID inválido" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const cordel = await prisma.book.findUnique({
      where: { id: idInt },
      select: {
        id: true,
        title: true,
        subtitle: true,
        frontCoverUrl: true,
        backCoverUrl: true,
        pdfUrl: true,
        category: true
      }
    });

    if (!cordel) {
      return new Response(
        JSON.stringify({ error: "Cordel não encontrado." }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify(cordel),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (e: any) {
    console.error("Erro ao buscar cordel:", e);
    return new Response(
      JSON.stringify({ error: "Erro ao buscar o cordel." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
