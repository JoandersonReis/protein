/*
  Warnings:

  - Added the required column `protein` to the `foods` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "foods" ADD COLUMN     "protein" DECIMAL(65,30) NOT NULL;
