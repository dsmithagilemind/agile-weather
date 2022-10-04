/*
  Warnings:

  - You are about to drop the `ClimateDataPoint` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ClimateEntry` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GeoLocation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RW_DataMigration` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Station` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_GeoLocationToStation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ClimateDataPoint";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ClimateEntry";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "GeoLocation";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "RW_DataMigration";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Station";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_GeoLocationToStation";
PRAGMA foreign_keys=on;
