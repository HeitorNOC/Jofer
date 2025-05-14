import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1");
  const category = url.searchParams.get("category") || "";
  const search = url.searchParams.get("search") || "";
  const perPage = 12;
  const skip = (page - 1) * perPage;

  try {
    const totalCount = await prisma.book.count({
      where: {
        category: category ? { contains: category } : undefined,
        title: search ? { contains: search } : undefined,
        type: "cordel"
      }
    });

    const cordeis = await prisma.book.findMany({
      where: {
        category: category ? { contains: category } : undefined,
        title: search ? { contains: search } : undefined,
        type: "cordel"
      },
      skip,
      take: perPage
    });

    return new Response(
      JSON.stringify({
        cordeis,
        totalCount,
        currentPage: page,
        totalPages: Math.ceil(totalCount / perPage),
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: "Erro ao buscar os cordeis." }), {
      status: 500,
    });
  }
}
