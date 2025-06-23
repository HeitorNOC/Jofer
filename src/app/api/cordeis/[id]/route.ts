// src/app/api/cordeis/[id]/route.ts
// import { PrismaClient } from "@prisma/client";
import { cordeis as cordeisData } from "../../../../../prisma/constants/cordeis";

// const prisma = new PrismaClient();

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
    // Find the cordel in the constants file by number (which is equivalent to id)
    const cordel = cordeisData.find(cordel => cordel.number === idInt);

    /* Original database code (commented out)
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
    */

    if (!cordel) {
      return new Response(
        JSON.stringify({ error: "Cordel não encontrado." }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    // Map the cordel data to match the expected structure
    const formattedCordel = {
      id: cordel.number,
      title: cordel.title,
      subtitle: cordel.subtitle || null,
      frontCoverUrl: cordel.frontCoverUrl,
      backCoverUrl: cordel.backCoverUrl,
      pdfUrl: cordel.pdfUrl,
      category: cordel.category
    };

    return new Response(
      JSON.stringify(formattedCordel),
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
