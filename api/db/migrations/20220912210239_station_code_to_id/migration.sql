/*
  Warnings:

  - The primary key for the `Station` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Station` table. All the data in the column will be lost.
  - You are about to drop the column `stationId` on the `Weather` table. All the data in the column will be lost.
  - Added the required column `stationCode` to the `Weather` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Station" (
    "code" TEXT NOT NULL PRIMARY KEY,
    "city" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "state" TEXT NOT NULL
);
INSERT INTO "new_Station" ("city", "code", "location", "state") SELECT "city", "code", "location", "state" FROM "Station";
DROP TABLE "Station";
ALTER TABLE "new_Station" RENAME TO "Station";
CREATE TABLE "new_Weather" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL,
    "precipitation" REAL NOT NULL,
    "avgTemp" INTEGER NOT NULL,
    "maxTemp" INTEGER NOT NULL,
    "minTemp" INTEGER NOT NULL,
    "windDirection" INTEGER NOT NULL,
    "windSpeed" REAL NOT NULL,
    "stationCode" TEXT NOT NULL,
    CONSTRAINT "Weather_stationCode_fkey" FOREIGN KEY ("stationCode") REFERENCES "Station" ("code") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Weather" ("avgTemp", "date", "id", "maxTemp", "minTemp", "precipitation", "windDirection", "windSpeed") SELECT "avgTemp", "date", "id", "maxTemp", "minTemp", "precipitation", "windDirection", "windSpeed" FROM "Weather";
DROP TABLE "Weather";
ALTER TABLE "new_Weather" RENAME TO "Weather";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
