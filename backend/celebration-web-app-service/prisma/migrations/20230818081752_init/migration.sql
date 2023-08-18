/*
  Warnings:

  - You are about to drop the column `companyId` on the `adminModel` table. All the data in the column will be lost.
  - Added the required column `companyName` to the `adminModel` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "adminModel" DROP CONSTRAINT "adminModel_companyId_fkey";

-- AlterTable
ALTER TABLE "adminModel" DROP COLUMN "companyId",
ADD COLUMN     "companyName" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "adminModel" ADD CONSTRAINT "adminModel_companyName_fkey" FOREIGN KEY ("companyName") REFERENCES "companyModel"("companyName") ON DELETE RESTRICT ON UPDATE CASCADE;
