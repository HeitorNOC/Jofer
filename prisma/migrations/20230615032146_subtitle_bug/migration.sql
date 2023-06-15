/*
  Warnings:

  - Made the column `subtitle` on table `Cordel` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Cordel" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
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
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
