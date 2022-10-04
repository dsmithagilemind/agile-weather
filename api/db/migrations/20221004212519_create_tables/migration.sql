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
    "zip" TEXT,
    "state" TEXT,
    "stateAbbrev" TEXT,
    "fips" TEXT,
    "county" TEXT
);

-- CreateTable
CREATE TABLE "Station" (
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

-- CreateTable
CREATE TABLE "ClimateDataPoint" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "label" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "flag" TEXT,
    "climateEntryId" INTEGER NOT NULL,
    CONSTRAINT "ClimateDataPoint_climateEntryId_fkey" FOREIGN KEY ("climateEntryId") REFERENCES "ClimateEntry" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ClimateEntry" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "stationId" TEXT NOT NULL,
    "topic" TEXT NOT NULL,
    "period" TEXT NOT NULL,
    "dataSet" TEXT NOT NULL,
    CONSTRAINT "ClimateEntry_stationId_fkey" FOREIGN KEY ("stationId") REFERENCES "Station" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "RW_DataMigration" (
    "version" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "startedAt" DATETIME NOT NULL,
    "finishedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "_GeoLocationToStation" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_GeoLocationToStation_A_fkey" FOREIGN KEY ("A") REFERENCES "GeoLocation" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_GeoLocationToStation_B_fkey" FOREIGN KEY ("B") REFERENCES "Station" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "UserExample_email_key" ON "UserExample"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Station_code_key" ON "Station"("code");

-- CreateIndex
CREATE UNIQUE INDEX "_GeoLocationToStation_AB_unique" ON "_GeoLocationToStation"("A", "B");

-- CreateIndex
CREATE INDEX "_GeoLocationToStation_B_index" ON "_GeoLocationToStation"("B");
