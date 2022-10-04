/*
  Warnings:

  - You are about to drop the column `elevation` on the `GeoLocation` table. All the data in the column will be lost.
  - You are about to drop the column `latitude` on the `GeoLocation` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `GeoLocation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Station" ADD COLUMN "elevation" REAL;
ALTER TABLE "Station" ADD COLUMN "latitude" REAL;
ALTER TABLE "Station" ADD COLUMN "longitude" REAL;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_GeoLocation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "city" TEXT NOT NULL,
    "zip" TEXT,
    "state" TEXT,
    "stateAbbrev" TEXT,
    "fips" TEXT,
    "county" TEXT
);
INSERT INTO "new_GeoLocation" ("city", "county", "fips", "id", "state", "stateAbbrev", "zip") SELECT "city", "county", "fips", "id", "state", "stateAbbrev", "zip" FROM "GeoLocation";
DROP TABLE "GeoLocation";
ALTER TABLE "new_GeoLocation" RENAME TO "GeoLocation";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
