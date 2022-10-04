/*
  Warnings:

  - You are about to drop the column `geoLocationId` on the `Station` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Station" (
    "code" TEXT NOT NULL PRIMARY KEY,
    "gcn" TEXT,
    "hcn" TEXT,
    "wmoid" TEXT
);
INSERT INTO "new_Station" ("code", "gcn", "hcn", "wmoid") SELECT "code", "gcn", "hcn", "wmoid" FROM "Station";
DROP TABLE "Station";
ALTER TABLE "new_Station" RENAME TO "Station";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
