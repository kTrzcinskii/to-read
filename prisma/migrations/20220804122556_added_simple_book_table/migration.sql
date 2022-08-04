-- CreateEnum
CREATE TYPE "BookStatus" AS ENUM ('WANT_TO_READ', 'IN_PROGRESS', 'COMPLETED');

-- CreateTable
CREATE TABLE "SimpleBook" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT,
    "pages" INTEGER,
    "imgLink" TEXT,
    "userRating" INTEGER,
    "userReview" TEXT,
    "status" "BookStatus" NOT NULL DEFAULT 'WANT_TO_READ',
    "userId" TEXT,

    CONSTRAINT "SimpleBook_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SimpleBook" ADD CONSTRAINT "SimpleBook_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
