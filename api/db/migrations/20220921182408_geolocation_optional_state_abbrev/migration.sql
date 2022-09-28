-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_GeoLocation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "city" TEXT NOT NULL,
    "zip" TEXT,
    "fips" TEXT,
    "county" TEXT,
    "latitude" REAL,
    "longitude" REAL,
    "elivation" REAL,
    "state" TEXT,
    "stateAbbrev" TEXT
);
INSERT INTO "new_GeoLocation" ("city", "county", "elivation", "fips", "id", "latitude", "longitude", "state", "stateAbbrev", "zip") SELECT "city", "county", "elivation", "fips", "id", "latitude", "longitude", "state", "stateAbbrev", "zip" FROM "GeoLocation";
DROP TABLE "GeoLocation";
ALTER TABLE "new_GeoLocation" RENAME TO "GeoLocation";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
