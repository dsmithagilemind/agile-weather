/*
  Warnings:

  - Added the required column `geoLocationId` to the `Station` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Station" (
    "code" TEXT NOT NULL PRIMARY KEY,
    "geoLocationId" INTEGER NOT NULL,
    "gcn" TEXT,
    "hcn" TEXT,
    "wmoid" TEXT,
    CONSTRAINT "Station_geoLocationId_fkey" FOREIGN KEY ("geoLocationId") REFERENCES "GeoLocation" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Station" ("code", "gcn", "hcn", "wmoid") SELECT "code", "gcn", "hcn", "wmoid" FROM "Station";
DROP TABLE "Station";
ALTER TABLE "new_Station" RENAME TO "Station";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
