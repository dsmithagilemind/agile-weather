/*
  Warnings:

  - The primary key for the `ClimateDataPoint` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `cuid` on the `ClimateDataPoint` table. All the data in the column will be lost.
  - The primary key for the `Station` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `stationCode` on the `ClimateEntry` table. All the data in the column will be lost.
  - Made the column `id` on table `ClimateDataPoint` required. This step will fail if there are existing NULL values in that column.
  - Made the column `id` on table `Station` required. This step will fail if there are existing NULL values in that column.
  - Made the column `stationId` on table `ClimateEntry` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ClimateDataPoint" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "label" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "flag" TEXT,
    "climateEntryId" INTEGER NOT NULL,
    CONSTRAINT "ClimateDataPoint_climateEntryId_fkey" FOREIGN KEY ("climateEntryId") REFERENCES "ClimateEntry" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ClimateDataPoint" ("climateEntryId", "flag", "id", "label", "value") SELECT "climateEntryId", "flag", "id", "label", "value" FROM "ClimateDataPoint";
DROP TABLE "ClimateDataPoint";
ALTER TABLE "new_ClimateDataPoint" RENAME TO "ClimateDataPoint";
CREATE TABLE "new_Station" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "code" TEXT NOT NULL,
    "latitude" REAL,
    "longitude" REAL,
    "elevation" REAL,
    "gsn" TEXT,
    "hcn" TEXT,
    "wmoid" TEXT,
    "stationName" TEXT
);
INSERT INTO "new_Station" ("code", "elevation", "gsn", "hcn", "id", "latitude", "longitude", "stationName", "wmoid") SELECT "code", "elevation", "gsn", "hcn", "id", "latitude", "longitude", "stationName", "wmoid" FROM "Station";
DROP TABLE "Station";
ALTER TABLE "new_Station" RENAME TO "Station";
CREATE TABLE "new__GeoLocationToStation" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_GeoLocationToStation_A_fkey" FOREIGN KEY ("A") REFERENCES "GeoLocation" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_GeoLocationToStation_B_fkey" FOREIGN KEY ("B") REFERENCES "Station" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new__GeoLocationToStation" ("A", "B") SELECT "A", "B" FROM "_GeoLocationToStation";
DROP TABLE "_GeoLocationToStation";
ALTER TABLE "new__GeoLocationToStation" RENAME TO "_GeoLocationToStation";
CREATE UNIQUE INDEX "_GeoLocationToStation_AB_unique" ON "_GeoLocationToStation"("A", "B");
CREATE INDEX "_GeoLocationToStation_B_index" ON "_GeoLocationToStation"("B");
CREATE TABLE "new_ClimateEntry" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "stationId" TEXT NOT NULL,
    "topic" TEXT NOT NULL,
    "period" TEXT NOT NULL,
    "dataSet" TEXT NOT NULL,
    CONSTRAINT "ClimateEntry_stationId_fkey" FOREIGN KEY ("stationId") REFERENCES "Station" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ClimateEntry" ("dataSet", "id", "period", "stationId", "topic") SELECT "dataSet", "id", "period", "stationId", "topic" FROM "ClimateEntry";
DROP TABLE "ClimateEntry";
ALTER TABLE "new_ClimateEntry" RENAME TO "ClimateEntry";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
