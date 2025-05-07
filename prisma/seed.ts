import { PrismaClient } from '@prisma/client';
import { cordeis } from './constants/cordeis';
import { livros } from './constants/livros';

const prisma = new PrismaClient();

async function main() {
  await prisma.comment.deleteMany();
  await prisma.book.deleteMany();
  await prisma.user.deleteMany();

  const cordelSeed = cordeis.map((book) => {
    return prisma.book.create({
      data: {
        title: book.title,
        number: book.number,
        type: book.type,
        subtitle: book.subtitle || "",
        author: book.author,
        pdfUrl: book.pdfUrl,
        frontCoverUrl: book.frontCoverUrl,
        backCoverUrl: book.backCoverUrl,
      },
    });
  });

  const livroSeed = livros.map((livro) => {
    return prisma.book.create({
      data: {
        title: livro.title,
        number: livro.number,
        type: livro.type,
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
