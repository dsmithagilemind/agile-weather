-- CreateTable
CREATE TABLE "UserExample" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "name" TEXT
);

-- CreateTable
CREATE TABLE "GeoLocation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "city" TEXT NOT NULL,
    "zip" INTEGER,
    "fips" TEXT,
    "county" TEXT,
    "latitude" REAL NOT NULL,
    "longitude" REAL NOT NULL,
    "elivation" REAL NOT NULL,
    "state" TEXT,
    "stateAbbrev" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Station" (
    "code" TEXT NOT NULL PRIMARY KEY,
    "geoLocationId" INTEGER NOT NULL,
    "gcn" TEXT,
    "hcn" TEXT,
    "wmoid" TEXT,
    CONSTRAINT "Station_geoLocationId_fkey" FOREIGN KEY ("geoLocationId") REFERENCES "GeoLocation" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ClimateDataPoint" (
    "cuid" TEXT NOT NULL PRIMARY KEY,
    "stationCode" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "flag" TEXT,
    "topic" TEXT NOT NULL,
    "period" TEXT NOT NULL,
    "climateEntryId" INTEGER NOT NULL,
    CONSTRAINT "ClimateDataPoint_stationCode_fkey" FOREIGN KEY ("stationCode") REFERENCES "Station" ("code") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ClimateDataPoint_climateEntryId_fkey" FOREIGN KEY ("climateEntryId") REFERENCES "ClimateEntry" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ClimateEntry" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "stationCode" TEXT NOT NULL,
    CONSTRAINT "ClimateEntry_stationCode_fkey" FOREIGN KEY ("stationCode") REFERENCES "Station" ("code") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "UserExample_email_key" ON "UserExample"("email");


CREATE UNIQUE INDEX "Station_code_key" ON "Station"("code");
