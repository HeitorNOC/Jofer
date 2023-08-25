-- CreateTable
CREATE TABLE "Livro" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "number" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "pdfUrl" TEXT NOT NULL,
    "frontCoverUrl" TEXT NOT NULL,
    "backCoverUrl" TEXT NOT NULL
);
