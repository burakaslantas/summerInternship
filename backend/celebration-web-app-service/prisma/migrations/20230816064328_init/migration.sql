-- AlterTable
ALTER TABLE "adminModel" ADD COLUMN     "isDeleted" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "companyModel" ADD COLUMN     "isDeleted" INTEGER NOT NULL DEFAULT 0;
