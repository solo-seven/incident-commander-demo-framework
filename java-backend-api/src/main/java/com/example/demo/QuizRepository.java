package com.example.demo;

public interface QuizRepository {
  Questions loadQuestions(int id);

  boolean submitAnswers(int id, int[] answers);
}
