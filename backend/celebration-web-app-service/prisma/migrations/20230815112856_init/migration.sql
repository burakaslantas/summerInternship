-- CreateTable
CREATE TABLE "adminModel" (
    "id" SERIAL NOT NULL,
    "adminName" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailPassword" TEXT NOT NULL,

    CONSTRAINT "adminModel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "adminModel_email_key" ON "adminModel"("email");
