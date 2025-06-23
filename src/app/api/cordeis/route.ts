// import { PrismaClient } from "@prisma/client";
import { cordeis as cordeisData } from "../../.././../prisma/constants/cordeis";

// const prisma = new PrismaClient();

export async function GET(request: Request) {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1");
  const category = url.searchParams.get("category") || "";
  const search = url.searchParams.get("search") || "";
  const perPage = 12;
  const skip = (page - 1) * perPage;

  try {
    // Using data from assets instead of database
    // Filter cordeis based on category and search parameters
    let filteredCordeis = cordeisData.filter(cordel => {
      // Filter by type (always "cordel")
      if (cordel.type !== "cordel") return false;
      
      // Filter by category if provided
      if (category && !cordel.category?.toLowerCase().includes(category.toLowerCase())) return false;
      
      // Filter by search term if provided
      if (search && !cordel.title.toLowerCase().includes(search.toLowerCase())) return false;
      
      return true;
    });

    // Get total count after filtering
    const totalCount = filteredCordeis.length;

    // Apply pagination
    const cordeis = filteredCordeis.slice(skip, skip + perPage);

    // Return the same response structure as before
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

    /* Original database code (commented out)
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
    */
  } catch (error) {
    return new Response(JSON.stringify({ error: "Erro ao buscar os cordeis." }), {
      status: 500,
    });
  }
}
