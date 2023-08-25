import { PrismaClient } from '@prisma/client';
import { cordeis } from './constants/cordeis';
import { livros } from './constants/livros';

const prisma = new PrismaClient();

async function main() {
  await prisma.comment.deleteMany();
  await prisma.cordel.deleteMany();
  await prisma.user.deleteMany();
  await prisma.livro.deleteMany();

  const cordelSeed = cordeis.map((cordel) => {
    return prisma.cordel.create({
      data: {
        title: cordel.title,
        number: cordel.number,
        subtitle: cordel.subtitle || "",
        author: cordel.author,
        pdfUrl: cordel.pdfUrl,
        frontCoverUrl: cordel.frontCoverUrl,
        backCoverUrl: cordel.backCoverUrl,
      },
    });
  });

  const livroSeed = livros.map((livro) => {
    return prisma.livro.create({
      data: {
        title: livro.title,
        number: livro.number,
        subtitle: livro.subtitle || "",
        author: livro.author,
        pdfUrl: livro.pdfUrl,
        frontCoverUrl: livro.frontCoverUrl,
        backCoverUrl: livro.backCoverUrl,
      },
    });
  });


  await prisma.$transaction([...cordelSeed,]);
  await prisma.$transaction([...livroSeed,]);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
