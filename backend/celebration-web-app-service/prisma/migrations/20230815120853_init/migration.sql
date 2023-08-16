-- CreateTable
CREATE TABLE "companyModel" (
    "id" SERIAL NOT NULL,
    "companyName" TEXT NOT NULL,
    "hrMail" TEXT NOT NULL,
    "hrMailPassword" TEXT NOT NULL,
    "aLiveToMail" TEXT NOT NULL,
    "aLiveCcMail" TEXT NOT NULL,
    "aLiveBccMail" TEXT NOT NULL,

    CONSTRAINT "companyModel_pkey" PRIMARY KEY ("id")
);
