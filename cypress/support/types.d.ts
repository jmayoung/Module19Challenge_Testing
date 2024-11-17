import { Schema } from "mongoose";

// Define Answer, Question and Quiz types matching the application's data structure
export interface Answer {
  text: string;
  isCorrect: boolean;
}
export interface Question {
  _id: string;
  question: string;
  answers: Answer[];
}
export interface Quiz {
  _id: Schema.Types.ObjectId;
  question: Question[];
  answer: string[];
}
