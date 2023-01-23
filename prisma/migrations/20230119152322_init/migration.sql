-- CreateTable
CREATE TABLE "Lead" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "mail" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "gclid" TEXT NOT NULL,
    "fbclid" TEXT NOT NULL,
    "utmSource" TEXT NOT NULL,
    "utmCampaign" TEXT NOT NULL,
    "utmMedium" TEXT NOT NULL,
    "utmTerm" TEXT NOT NULL,
    "utmContent" TEXT NOT NULL
);
