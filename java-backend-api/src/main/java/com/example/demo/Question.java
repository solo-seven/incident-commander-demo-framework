package com.example.demo;

public class Question {
  private int id;
  private String label;
  private AnswerOption[] options;
  private int answer;

  public Question() {
  }

  public Question(int id, String label, AnswerOption[] options, int answer) {
    this.id = id;
    this.label = label;
    this.options = options;
    this.answer = answer;
  }

  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public String getLabel() {
    return label;
  }

  public void setLabel(String label) {
    this.label = label;
  }

  public AnswerOption[] getOptions() {
    return options;
  }

  public void setOptions(AnswerOption[] options) {
    this.options = options;
  }

  public int getAnswer() {
    return answer;
  }

  public void setAnswer(int answer) {
    this.answer = answer;
  }
}
