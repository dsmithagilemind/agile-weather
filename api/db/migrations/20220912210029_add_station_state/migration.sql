/*
  Warnings:

  - Added the required column `state` to the `Station` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Station" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "state" TEXT NOT NULL
);
INSERT INTO "new_Station" ("city", "code", "id", "location") SELECT "city", "code", "id", "location" FROM "Station";
DROP TABLE "Station";
ALTER TABLE "new_Station" RENAME TO "Station";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
