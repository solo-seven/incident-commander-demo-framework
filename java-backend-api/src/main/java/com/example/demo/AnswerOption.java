package com.example.demo;

public class AnswerOption {
  private int id;
  private String label;

  public AnswerOption() {
  }

  public AnswerOption(int id, String label) {
    this.id = id;
    this.label = label;
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
}
