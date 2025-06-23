// src/app/api/palestras/route.ts
import { NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";
import { palestras as palestrasData } from "../../.././../prisma/constants/palestras";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const page = Number(url.searchParams.get("page") || "1");
  const perPage = 6;
  const skip = (page - 1) * perPage;

  try {
    // Sort palestras by date in descending order
    const sortedPalestras = [...palestrasData].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    // Get total count
    const totalCount = sortedPalestras.length;
    
    // Apply pagination
    const palestras = sortedPalestras.slice(skip, skip + perPage).map((palestra, index) => ({
      id: skip + index + 1, // Generate an id since the constants don't have one
      title: palestra.title,
      date: palestra.date,
      summary: palestra.summary,
      youtubeUrl: palestra.youtubeUrl,
    }));

    /* Original database code (commented out)
    const totalCount = await prisma.palestra.count();
    const palestras = await prisma.palestra.findMany({
      skip,
      take: perPage,
      orderBy: { date: "desc" },
      select: {
        id: true,
        title: true,
        date: true,
        summary: true,
        youtubeUrl: true,
      },
    });
    */

    return NextResponse.json({
      palestras,
      meta: {
        pageIndex: page - 1,
        perPage,
        totalCount,
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Erro ao buscar palestras." },
      { status: 500 }
    );
  }
}
