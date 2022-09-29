/*
  Warnings:

  - You are about to drop the column `stationCode` on the `ClimateDataPoint` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ClimateDataPoint" (
    "cuid" TEXT NOT NULL PRIMARY KEY,
    "label" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "flag" TEXT,
    "climateEntryId" INTEGER NOT NULL,
    CONSTRAINT "ClimateDataPoint_climateEntryId_fkey" FOREIGN KEY ("climateEntryId") REFERENCES "ClimateEntry" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ClimateDataPoint" ("climateEntryId", "cuid", "flag", "label", "value") SELECT "climateEntryId", "cuid", "flag", "label", "value" FROM "ClimateDataPoint";
DROP TABLE "ClimateDataPoint";
ALTER TABLE "new_ClimateDataPoint" RENAME TO "ClimateDataPoint";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
