/*
  Warnings:

  - You are about to drop the column `metadata` on the `Question` table. All the data in the column will be lost.
  - Added the required column `examBoard` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mathTopic` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paperNumber` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `questionNumber` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `questionType` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `session` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `syllabusCode` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `yearOfExam` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Question" DROP COLUMN "metadata",
ADD COLUMN     "examBoard" TEXT NOT NULL,
ADD COLUMN     "mathTopic" TEXT NOT NULL,
ADD COLUMN     "paperNumber" TEXT NOT NULL,
ADD COLUMN     "questionNumber" INTEGER NOT NULL,
ADD COLUMN     "questionType" TEXT NOT NULL,
ADD COLUMN     "session" TEXT NOT NULL,
ADD COLUMN     "syllabusCode" TEXT NOT NULL,
ADD COLUMN     "yearOfExam" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "Question_examBoard_syllabusCode_yearOfExam_paperNumber_ques_idx" ON "Question"("examBoard", "syllabusCode", "yearOfExam", "paperNumber", "questionNumber");
