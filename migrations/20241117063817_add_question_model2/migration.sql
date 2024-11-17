/*
  Warnings:

  - You are about to drop the column `tags` on the `Question` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Question" DROP COLUMN "tags",
ADD COLUMN     "topicsCovered" TEXT[];

-- CreateIndex
CREATE INDEX "Question_title_idx" ON "Question"("title");

-- CreateIndex
CREATE INDEX "Question_difficulty_idx" ON "Question"("difficulty");
