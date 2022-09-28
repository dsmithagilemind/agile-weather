/*
  Warnings:

  - You are about to drop the column `geoLocationId` on the `Station` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "_GeoLocationToStation" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_GeoLocationToStation_A_fkey" FOREIGN KEY ("A") REFERENCES "GeoLocation" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_GeoLocationToStation_B_fkey" FOREIGN KEY ("B") REFERENCES "Station" ("code") ON DELETE CASCADE ON UPDATE CASCADE
);

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

-- CreateIndex
CREATE UNIQUE INDEX "_GeoLocationToStation_AB_unique" ON "_GeoLocationToStation"("A", "B");

-- CreateIndex
CREATE INDEX "_GeoLocationToStation_B_index" ON "_GeoLocationToStation"("B");
