-- CreateTable
CREATE TABLE "WeatherSearch" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT
);

-- CreateTable
CREATE TABLE "Weather" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL,
    "precipitation" REAL NOT NULL,
    "avgTemp" INTEGER NOT NULL,
    "maxTemp" INTEGER NOT NULL,
    "minTemp" INTEGER NOT NULL,
    "windDirection" INTEGER NOT NULL,
    "windSpeed" REAL NOT NULL,
    "stationId" INTEGER NOT NULL,
    CONSTRAINT "Weather_stationId_fkey" FOREIGN KEY ("stationId") REFERENCES "Station" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Station" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "location" TEXT NOT NULL
);
