/*
  Warnings:

  - Added the required column `dataSet` to the `ClimateDataPoint` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ClimateDataPoint" (
    "cuid" TEXT NOT NULL PRIMARY KEY,
    "stationCode" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "flag" TEXT,
    "topic" TEXT NOT NULL,
    "period" TEXT NOT NULL,
    "dataSet" TEXT NOT NULL,
    "climateEntryId" INTEGER NOT NULL,
    CONSTRAINT "ClimateDataPoint_stationCode_fkey" FOREIGN KEY ("stationCode") REFERENCES "Station" ("code") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ClimateDataPoint_climateEntryId_fkey" FOREIGN KEY ("climateEntryId") REFERENCES "ClimateEntry" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ClimateDataPoint" ("climateEntryId", "cuid", "flag", "period", "stationCode", "topic", "value") SELECT "climateEntryId", "cuid", "flag", "period", "stationCode", "topic", "value" FROM "ClimateDataPoint";
DROP TABLE "ClimateDataPoint";
ALTER TABLE "new_ClimateDataPoint" RENAME TO "ClimateDataPoint";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
