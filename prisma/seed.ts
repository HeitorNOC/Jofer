import { PrismaClient } from '@prisma/client';
import { books } from './constants/books';

const prisma = new PrismaClient();

async function main() {
  await prisma.comment.deleteMany();
  await prisma.book.deleteMany();
  await prisma.user.deleteMany();

  const booksSeed = books.map((book) => {
    return prisma.book.create({
      data: {
        title: book.title,
        number: book.number,
        subtitle: book.subtitle,
        author: book.author,
        pdfUrl: book.pdfUrl,
        coverUrl: book.coverUrl,
      },
    });
  });


  await prisma.$transaction([...booksSeed,]);
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
