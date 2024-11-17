'use client';

import { useEffect, useState } from 'react';
var Latex = require('react-latex');
interface Question {
  id: number;
  title: string;
  content: string;
  solution: string;
  examBoard: string;
  syllabusCode: string;
  yearOfExam: number;
  session: string;
  paperNumber: string;
  questionNumber: number;
  questionType: string;
  mathTopic: string;
  difficulty?: string;
  topicsCovered: string[];
  marksAllocation: Record<string, number>; // JSON object; adjust based on your structure
  imageUrls: string[];
  createdAt: string;
  updatedAt: string;
}

export default function QuestionsPage() {
  // Use the Question[] type to specify the shape of the questions array
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    // Fetch questions from the API route
    async function fetchQuestions() {
      try {
        const res = await fetch('/api/questions');
        if (!res.ok) {
          throw new Error(`Error fetching questions: ${res.statusText}`);
        }
        const data: Question[] = await res.json(); // Enforce API response type
        setQuestions(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchQuestions();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">All Questions</h1>
          
      <div className="grid gap-4">
        {questions.length > 0 ? (
          questions.map((question) => (
            <div
              key={question.id}
              className="p-4 border rounded shadow-sm bg-white"
            >
              <h2 className="font-semibold text-lg mb-2">{question.title}</h2>
              <p>
                <strong>Content:</strong> <Latex>{question.content}</Latex>
              </p>
              <p>
                <strong>Solution:</strong> <Latex>{question.solution}</Latex>
              </p>
              <p>
                <strong>Exam Board:</strong> {question.examBoard}
              </p>
              <p>
                <strong>Syllabus Code:</strong> {question.syllabusCode}
              </p>
              <p>
                <strong>Year of Exam:</strong> {question.yearOfExam}
              </p>
              <p>
                <strong>Session:</strong> {question.session}
              </p>
              <p>
                <strong>Paper Number:</strong> {question.paperNumber}
              </p>
              <p>
                <strong>Question Number:</strong> {question.questionNumber}
              </p>
              <p>
                <strong>Question Type:</strong> {question.questionType}
              </p>
              <p>
                <strong>Math Topic:</strong> {question.mathTopic}
              </p>
              <p>
                <strong>Difficulty:</strong> {question.difficulty || 'N/A'}
              </p>
              <p>
                <strong>Topics Covered:</strong>{' '}
                {question.topicsCovered.join(', ')}
              </p>
              <p>
                <strong>Marks Allocation:</strong>{' '}
                {JSON.stringify(question.marksAllocation)}
              </p>
              <p>
                <strong>Images:</strong>{' '}
                {question.imageUrls.map((url, idx) => (
                  <a
                    key={idx}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    Image {idx + 1}
                  </a>
                ))}
              </p>
              <p>
                <small>
                  Created At: {new Date(question.createdAt).toLocaleString()}
                </small>
              </p>
              <p>
                <small>
                  Updated At: {new Date(question.updatedAt).toLocaleString()}
                </small>
              </p>
            </div>
          ))
        ) : (
          <p>No questions found.</p>
        )}
      </div>
    </div>
  );
}
