-- AlterTable
ALTER TABLE "ClimateDataPoint" ADD COLUMN "id" TEXT;

-- AlterTable
ALTER TABLE "ClimateEntry" ADD COLUMN "stationId" TEXT;

-- AlterTable
ALTER TABLE "Station" ADD COLUMN "id" TEXT;
