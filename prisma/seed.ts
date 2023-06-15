import { PrismaClient } from '@prisma/client';
import { cordeis } from './constants/cordeis';

const prisma = new PrismaClient();

async function main() {
  await prisma.comment.deleteMany();
  await prisma.cordel.deleteMany();
  await prisma.user.deleteMany();

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


  await prisma.$transaction([...cordelSeed,]);
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
