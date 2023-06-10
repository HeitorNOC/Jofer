-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Book" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "number" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "author" TEXT NOT NULL,
    "pdfUrl" TEXT NOT NULL,
    "coverUrl" TEXT NOT NULL
);
INSERT INTO "new_Book" ("author", "coverUrl", "id", "number", "pdfUrl", "subtitle", "title") SELECT "author", "coverUrl", "id", "number", "pdfUrl", "subtitle", "title" FROM "Book";
DROP TABLE "Book";
ALTER TABLE "new_Book" RENAME TO "Book";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
