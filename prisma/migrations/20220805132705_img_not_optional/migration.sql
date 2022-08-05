/*
  Warnings:

  - Made the column `imgLink` on table `SimpleBook` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "SimpleBook" ALTER COLUMN "imgLink" SET NOT NULL;
