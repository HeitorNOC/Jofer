/*
  Warnings:

  - You are about to drop the column `coverUrl` on the `Book` table. All the data in the column will be lost.
  - Added the required column `backCoverUrl` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `frontCoverUrl` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subtitle` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Book" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "author" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "pdfUrl" TEXT NOT NULL,
    "frontCoverUrl" TEXT NOT NULL,
    "backCoverUrl" TEXT NOT NULL
);
INSERT INTO "new_Book" ("author", "id", "pdfUrl", "title") SELECT "author", "id", "pdfUrl", "title" FROM "Book";
DROP TABLE "Book";
ALTER TABLE "new_Book" RENAME TO "Book";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
