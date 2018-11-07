import { Component, OnInit } from '@angular/core';
import { Questionnaire } from '../questionnaire';
import { Question } from '../questions';
import { Answer } from '../answer';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-questionnaire-detail',
  templateUrl: './questionnaire-detail.component.html',
  styleUrls: ['./questionnaire-detail.component.css']
})
export class QuestionnaireDetailComponent implements OnInit {

  questionnaire : Questionnaire;

  question : Question;

  constructor(private route : ActivatedRoute,
    private router: Router,
    private dataService : DataService) { }

  ngOnInit() {
    const title : string = this.route.snapshot.paramMap.get('title');
    this.questionnaire = this.dataService.getQuestionnaire(title);

    if(this.questionnaire.questions.filter(q => q.answered === undefined).length > 0)
      this.question = this.questionnaire.questions.filter(q => q.answered === undefined)[0];
  }

  getQuestionsAnsweredCount() : number {
    return this.questionnaire.questions.filter(q => q.answered !== undefined).length;
  }

  getProgressBarWidth() : number {
    return Math.round(100 * this.getQuestionsAnsweredCount() / this.questionnaire.questions.length);
  }

  chosenAnswer(answer : Answer) : void {
    this.dataService.setAnswer(this.questionnaire, this.question, answer);
    this.question.answered = answer;
  }

  back() : void {
    this.question.answered = undefined;
  }

  next() : void {
    if(this.questionnaire.questions.filter(q => q.answered === undefined).length > 0)
      this.question = this.questionnaire.questions.filter(q => q.answered === undefined)[0];
  }
}
