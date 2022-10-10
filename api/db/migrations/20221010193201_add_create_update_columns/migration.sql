-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_GeoLocation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
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
CREATE TABLE "new_ZipSearch" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "zip" TEXT NOT NULL,
    "date" DATETIME NOT NULL
);
INSERT INTO "new_ZipSearch" ("date", "id", "zip") SELECT "date", "id", "zip" FROM "ZipSearch";
DROP TABLE "ZipSearch";
ALTER TABLE "new_ZipSearch" RENAME TO "ZipSearch";
CREATE TABLE "new_ClimateDataPoint" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "label" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "flag" TEXT,
    "climateEntryId" INTEGER NOT NULL,
    CONSTRAINT "ClimateDataPoint_climateEntryId_fkey" FOREIGN KEY ("climateEntryId") REFERENCES "ClimateEntry" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ClimateDataPoint" ("climateEntryId", "flag", "id", "label", "value") SELECT "climateEntryId", "flag", "id", "label", "value" FROM "ClimateDataPoint";
DROP TABLE "ClimateDataPoint";
ALTER TABLE "new_ClimateDataPoint" RENAME TO "ClimateDataPoint";
CREATE TABLE "new_UserExample" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "email" TEXT NOT NULL,
    "name" TEXT
);
INSERT INTO "new_UserExample" ("email", "id", "name") SELECT "email", "id", "name" FROM "UserExample";
DROP TABLE "UserExample";
ALTER TABLE "new_UserExample" RENAME TO "UserExample";
CREATE UNIQUE INDEX "UserExample_email_key" ON "UserExample"("email");
CREATE TABLE "new_Station" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
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
CREATE UNIQUE INDEX "Station_code_key" ON "Station"("code");
CREATE TABLE "new_ClimateEntry" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
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
