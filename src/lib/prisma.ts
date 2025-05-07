// lib/prisma.ts
import { PrismaClient } from "@prisma/client";

// Verifica se o ambiente é de produção ou desenvolvimento
let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  // Em produção, cria uma nova instância de Prisma Client
  prisma = new PrismaClient({
    log: ['query'],
  });
} else {
  // Em desenvolvimento, usa a instância global do Prisma Client
  if (!(globalThis as any).prisma) {
    (globalThis as any).prisma = new PrismaClient({
      log: ['query'],
    });
  }
  prisma = (globalThis as any).prisma;
}

export { prisma }
