/*
  Warnings:

  - You are about to drop the column `dataSet` on the `ClimateDataPoint` table. All the data in the column will be lost.
  - You are about to drop the column `period` on the `ClimateDataPoint` table. All the data in the column will be lost.
  - You are about to drop the column `topic` on the `ClimateDataPoint` table. All the data in the column will be lost.
  - Added the required column `label` to the `ClimateDataPoint` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dataSet` to the `ClimateEntry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `period` to the `ClimateEntry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `topic` to the `ClimateEntry` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ClimateDataPoint" (
    "cuid" TEXT NOT NULL PRIMARY KEY,
    "stationCode" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "flag" TEXT,
    "climateEntryId" INTEGER NOT NULL,
    CONSTRAINT "ClimateDataPoint_stationCode_fkey" FOREIGN KEY ("stationCode") REFERENCES "Station" ("code") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ClimateDataPoint_climateEntryId_fkey" FOREIGN KEY ("climateEntryId") REFERENCES "ClimateEntry" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ClimateDataPoint" ("climateEntryId", "cuid", "flag", "stationCode", "value") SELECT "climateEntryId", "cuid", "flag", "stationCode", "value" FROM "ClimateDataPoint";
DROP TABLE "ClimateDataPoint";
ALTER TABLE "new_ClimateDataPoint" RENAME TO "ClimateDataPoint";
CREATE TABLE "new_ClimateEntry" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "stationCode" TEXT NOT NULL,
    "topic" TEXT NOT NULL,
    "period" TEXT NOT NULL,
    "dataSet" TEXT NOT NULL,
    CONSTRAINT "ClimateEntry_stationCode_fkey" FOREIGN KEY ("stationCode") REFERENCES "Station" ("code") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ClimateEntry" ("id", "stationCode") SELECT "id", "stationCode" FROM "ClimateEntry";
DROP TABLE "ClimateEntry";
ALTER TABLE "new_ClimateEntry" RENAME TO "ClimateEntry";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
