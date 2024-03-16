package com.example.demo;

public class QuizResult {
  private String message;

  public QuizResult(String message) {
    this.message = message;
  }

  public QuizResult() {
  }

  public String getMessage() {
    return message;
  }

  public void setMessage(String message) {
    this.message = message;
  }
}
