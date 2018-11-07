import { Injectable } from '@angular/core';
import { Questionnaire } from './questionnaire';
import { Question } from './questions';
import { Answer } from './answer';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  questionnaires: Questionnaire[] = [new Questionnaire({
    title: "test2",
    questions: [
      new Question({
        title: "Question 1",
        text: "Question text 1",
        answers: [
          new Answer({
            text: "Answer 1",
            correct: true
          }),
          new Answer({
            text: "Answer 2",
            correct: false
          }),
          new Answer({
            text: "Answer 3",
            correct: false
          }),
        ],
        answered: new Answer({
          text: "Answer 1",
          correct: true
        })
      }),
      new Question({
        title: "Question 2",
        text: "Question text 2",
        answers: [
          new Answer({
            text: "Answer 1",
            correct: false
          }),
          new Answer({
            text: "Answer 2",
            correct: true
          }),
          new Answer({
            text: "Answer 3",
            correct: false
          }),
        ],
        answered: new Answer({
          text: "Answer 1",
          correct: false
        })
      }),
      new Question({
        title: "Question 3",
        text: "Question text 3",
        answers: [
          new Answer({
            text: "Answer 1",
            correct: false
          }),
          new Answer({
            text: "Answer 2",
            correct: true
          }),
          new Answer({
            text: "Answer 3",
            correct: false
          }),
        ]
      })
    ]
  })];

  constructor() { }

  getQuestionnaires(): Questionnaire[] {
    return this.questionnaires;
  }

  getQuestionnaire(title: string): Questionnaire {
    if(this.questionnaires.filter(q => q.title === title).length > 0)
      return this.questionnaires.filter(q => q.title === title)[0];
    else
      return null;
  }
}
