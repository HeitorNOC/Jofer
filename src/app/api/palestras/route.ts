// src/app/api/palestras/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const page = Number(url.searchParams.get("page") || "1");
  const perPage = 6;
  const skip = (page - 1) * perPage;

  try {
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
