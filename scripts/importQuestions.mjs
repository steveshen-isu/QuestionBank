import { PrismaClient } from '@prisma/client';
import fs from 'fs';

const prisma = new PrismaClient();

async function main() {
  const jsonFilePath = './public/QuestionBank.json';

  if (!fs.existsSync(jsonFilePath)) {
    console.error(`File not found: ${jsonFilePath}`);
    return;
  }

  const jsonData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8'));

  // Ensure the JSON is structured as expected
  if (!jsonData || !jsonData.Question || !jsonData.Question.Metadata) {
    console.error('Invalid JSON structure. Ensure the file matches the expected format.');
    return;
  }

  const { Metadata, QuestionContent, SolutionContent } = jsonData.Question;

  try {
    // Insert the question into the database
    await prisma.question.create({
      data: {
        title: Metadata.QuestionTitle || 'Untitled Question',
        content: QuestionContent.Text || '',
        solution: SolutionContent.Parts.map((part) => `${part.Part}: ${part.Solution}`).join('\n') || '',
        examBoard: Metadata.ExamBoard || '',
        syllabusCode: Metadata.SyllabusCode || '',
        yearOfExam: Metadata.YearOfExam || null,
        session: Metadata.Session || '',
        paperNumber: Metadata.PaperNumber || '',
        questionNumber: Metadata.QuestionNumber || null,
        questionType: Metadata.QuestionType || '',
        mathTopic: Metadata.MathTopic || '',
        difficulty: Metadata.DifficultyLevel || null,
        topicsCovered: Metadata.TopicsCovered || [],
        marksAllocation: Metadata.MarksAllocation || {},
        imageUrls: Metadata.ImageUrl || [],
      },
    });

    console.log(`Successfully inserted question: ${Metadata.QuestionTitle}`);
  } catch (error) {
    console.error('Error inserting question:', error.message);
  }
}

main()
  .catch((e) => console.error('Fatal error:', e))
  .finally(() => prisma.$disconnect());
