/*
  Warnings:

  - You are about to drop the column `companyName` on the `adminModel` table. All the data in the column will be lost.
  - Added the required column `companyId` to the `adminModel` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "adminModel" DROP CONSTRAINT "adminModel_companyName_fkey";

-- AlterTable
ALTER TABLE "adminModel" DROP COLUMN "companyName",
ADD COLUMN     "companyId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "adminModel" ADD CONSTRAINT "adminModel_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companyModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
