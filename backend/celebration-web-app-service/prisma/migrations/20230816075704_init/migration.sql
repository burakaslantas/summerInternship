-- CreateTable
CREATE TABLE "employeeModel" (
    "id" SERIAL NOT NULL,
    "employeeName" TEXT NOT NULL,
    "employeeSurname" TEXT NOT NULL,
    "employeeEmail" TEXT NOT NULL,
    "employeeRegNo" TEXT NOT NULL,
    "employeeStartDate" TEXT NOT NULL,
    "employeeBirthDay" TEXT NOT NULL,
    "managerName" TEXT NOT NULL,
    "managerSurname" TEXT NOT NULL,
    "managerRegNo" TEXT NOT NULL,
    "companyRegNo" TEXT NOT NULL,
    "isDeleted" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "employeeModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "eventModel" (
    "id" SERIAL NOT NULL,
    "eventName" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "bcc" TEXT NOT NULL,
    "hour" TEXT NOT NULL,
    "minute" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "imageFile" TEXT NOT NULL,
    "textTemplate" TEXT NOT NULL,
    "isDeleted" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "eventModel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "employeeModel_employeeEmail_key" ON "employeeModel"("employeeEmail");

-- CreateIndex
CREATE UNIQUE INDEX "employeeModel_employeeRegNo_key" ON "employeeModel"("employeeRegNo");
