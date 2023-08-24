/*
  Warnings:

  - Added the required column `companyHrGroupMail` to the `companyModel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "companyModel" ADD COLUMN     "companyHrGroupMail" TEXT NOT NULL;
