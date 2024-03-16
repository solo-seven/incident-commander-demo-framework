package com.example.demo;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/quiz")
@CrossOrigin(origins = {"http://localhost:3000", "http://frontend.dsdemo.valesordev.com:3000", "http://frontend.dsdemo.valesordev.com"})
public class QuizQuestionsController {
  private static final Logger log = LoggerFactory.getLogger(QuizQuestionsController.class.getName());
  private final QuizRepository quizRepository;

  public QuizQuestionsController() {
    this(new QuizRepository() {
      @Override
      public Questions loadQuestions(int id) {
        return new Questions(new Question[]{
            new Question(1, "What does TTFB mean?",
                new AnswerOption[]{
                    new AnswerOption(1, "Teatotal Food Beverage"),
                    new AnswerOption(2, "Time to First Byte"),
                    new AnswerOption(3, "Time to First Beer")}, -1),
            new Question(2, "What is FCP?",
                new AnswerOption[]{
                    new AnswerOption(1, "Frontend Change Painter"),
                    new AnswerOption(2, "Fall Coors Pabst"),
                    new AnswerOption(3, "First Contentful Paint")}, -1)
        });
      }

      @Override
      public boolean submitAnswers(int id, int[] answers) {
        return answers != null && answers.length == 2;
      }
    });
  }
  public QuizQuestionsController(QuizRepository quizRepository) {
    this.quizRepository = quizRepository;
  }
  @GetMapping("/questions/{id}")
  public Questions loadQuestions(@PathVariable("id") int id) {
    log.info("Getting questions with id " + id);
    return this.quizRepository.loadQuestions(id);
  }
  @PostMapping("/answers/{id}")
  public QuizResult submitAnswers(@PathVariable("id") int id, @RequestBody int[] answers) {
    log.info("Submitting answers for id " + id);
    return this.quizRepository.submitAnswers(id, answers) ? new QuizResult("SUCCESS") : new QuizResult("FAILURE");
  }
}
