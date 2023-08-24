/*
  Warnings:

  - A unique constraint covering the columns `[companyFullName]` on the table `companyModel` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `companyFullName` to the `companyModel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "companyModel" ADD COLUMN     "companyFullName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "companyModel_companyFullName_key" ON "companyModel"("companyFullName");
