/*
  Warnings:

  - Added the required column `googleId` to the `SimpleBook` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SimpleBook" ADD COLUMN     "googleId" TEXT NOT NULL;
