package com.example.demo;

import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class QuizQuestionsControllerTest {
  @Test
  void testLoadQuestions() {
    QuizQuestionsController quizQuestionsController = new QuizQuestionsController();
    Questions questions = quizQuestionsController.loadQuestions(1);
    for (Question question : questions.getQuestions()) {
      Assert.assertNotNull(question);
    }
  }
  @Test
  void testSubmitAnswers() {
    QuizQuestionsController quizQuestionsController = new QuizQuestionsController();
    QuizResult quizResult = quizQuestionsController.submitAnswers(1, new int[]{1, 2});
    Assert.assertEquals("SUCCESS", quizResult.getMessage());
  }
}
