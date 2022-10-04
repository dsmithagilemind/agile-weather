/*
  Warnings:

  - You are about to drop the column `gcn` on the `Station` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Station" (
    "code" TEXT NOT NULL PRIMARY KEY,
    "gsn" TEXT,
    "hcn" TEXT,
    "wmoid" TEXT,
    "stationName" TEXT
);
INSERT INTO "new_Station" ("code", "hcn", "wmoid") SELECT "code", "hcn", "wmoid" FROM "Station";
DROP TABLE "Station";
ALTER TABLE "new_Station" RENAME TO "Station";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
