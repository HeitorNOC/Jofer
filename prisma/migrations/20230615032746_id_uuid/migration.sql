/*
  Warnings:

  - The primary key for the `Cordel` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Comment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `bookId` on the `Comment` table. All the data in the column will be lost.
  - Added the required column `cordelId` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Cordel" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "number" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "pdfUrl" TEXT NOT NULL,
    "frontCoverUrl" TEXT NOT NULL,
    "backCoverUrl" TEXT NOT NULL
);
INSERT INTO "new_Cordel" ("author", "backCoverUrl", "frontCoverUrl", "id", "number", "pdfUrl", "subtitle", "title") SELECT "author", "backCoverUrl", "frontCoverUrl", "id", "number", "pdfUrl", "subtitle", "title" FROM "Cordel";
DROP TABLE "Cordel";
ALTER TABLE "new_Cordel" RENAME TO "Cordel";
CREATE TABLE "new_Comment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "comment" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "cordelId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Comment_cordelId_fkey" FOREIGN KEY ("cordelId") REFERENCES "Cordel" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Comment" ("comment", "createdAt", "id", "userId") SELECT "comment", "createdAt", "id", "userId" FROM "Comment";
DROP TABLE "Comment";
ALTER TABLE "new_Comment" RENAME TO "Comment";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
