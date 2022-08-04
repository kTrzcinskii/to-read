/*
  Warnings:

  - You are about to drop the column `author` on the `SimpleBook` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SimpleBook" DROP COLUMN "author",
ADD COLUMN     "authors" TEXT[];
