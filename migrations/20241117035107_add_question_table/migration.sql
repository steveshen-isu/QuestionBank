/*
  Warnings:

  - Added the required column `marksAllocation` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Made the column `solution` on table `Question` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "difficulty" TEXT,
ADD COLUMN     "imageUrls" TEXT[],
ADD COLUMN     "marksAllocation" JSONB NOT NULL,
ALTER COLUMN "solution" SET NOT NULL;
