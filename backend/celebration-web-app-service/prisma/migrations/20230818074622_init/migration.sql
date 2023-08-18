/*
  Warnings:

  - You are about to drop the column `company` on the `adminModel` table. All the data in the column will be lost.
  - You are about to drop the column `isDeleted` on the `adminModel` table. All the data in the column will be lost.
  - You are about to drop the column `isDeleted` on the `companyModel` table. All the data in the column will be lost.
  - You are about to drop the column `isDeleted` on the `employeeModel` table. All the data in the column will be lost.
  - You are about to drop the column `company` on the `eventModel` table. All the data in the column will be lost.
  - You are about to drop the column `fileId` on the `eventModel` table. All the data in the column will be lost.
  - You are about to drop the column `isDeleted` on the `eventModel` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `adminModel` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `attachmentModel` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[eventId]` on the table `attachmentModel` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `companyModel` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[companyName]` on the table `companyModel` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `employeeModel` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `eventModel` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `companyId` to the `adminModel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyId` to the `employeeModel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyId` to the `eventModel` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "eventModel" DROP CONSTRAINT "eventModel_fileId_fkey";

-- DropIndex
DROP INDEX "employeeModel_employeeEmail_key";

-- DropIndex
DROP INDEX "employeeModel_employeeRegNo_key";

-- DropIndex
DROP INDEX "eventModel_fileId_key";

-- AlterTable
ALTER TABLE "adminModel" DROP COLUMN "company",
DROP COLUMN "isDeleted",
ADD COLUMN     "companyId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "attachmentModel" ADD COLUMN     "eventId" INTEGER;

-- AlterTable
ALTER TABLE "companyModel" DROP COLUMN "isDeleted";

-- AlterTable
ALTER TABLE "employeeModel" DROP COLUMN "isDeleted",
ADD COLUMN     "companyId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "eventModel" DROP COLUMN "company",
DROP COLUMN "fileId",
DROP COLUMN "isDeleted",
ADD COLUMN     "companyId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "adminModel_id_key" ON "adminModel"("id");

-- CreateIndex
CREATE UNIQUE INDEX "attachmentModel_id_key" ON "attachmentModel"("id");

-- CreateIndex
CREATE UNIQUE INDEX "attachmentModel_eventId_key" ON "attachmentModel"("eventId");

-- CreateIndex
CREATE UNIQUE INDEX "companyModel_id_key" ON "companyModel"("id");

-- CreateIndex
CREATE UNIQUE INDEX "companyModel_companyName_key" ON "companyModel"("companyName");

-- CreateIndex
CREATE UNIQUE INDEX "employeeModel_id_key" ON "employeeModel"("id");

-- CreateIndex
CREATE UNIQUE INDEX "eventModel_id_key" ON "eventModel"("id");

-- AddForeignKey
ALTER TABLE "adminModel" ADD CONSTRAINT "adminModel_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companyModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employeeModel" ADD CONSTRAINT "employeeModel_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companyModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "eventModel" ADD CONSTRAINT "eventModel_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companyModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attachmentModel" ADD CONSTRAINT "attachmentModel_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "eventModel"("id") ON DELETE SET NULL ON UPDATE CASCADE;
