import { Component, OnInit } from '@angular/core';
import { Questionnaire } from '../questionnaire';
import { Question } from '../question';
import { Answer } from '../answer';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-questionnaire-detail',
  templateUrl: './questionnaire-detail.component.html',
  styleUrls: ['./questionnaire-detail.component.css']
})
export class QuestionnaireDetailComponent implements OnInit {

  questionnaire: Questionnaire;
  question: Question;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService) { }

  ngOnInit() {
    const title: string = this.route.snapshot.paramMap.get('title');
    this.questionnaire = this.dataService.getQuestionnaire(title);

    if (this.questionnaire === null) {
      const questionnaires = this.dataService.getQuestionnaires().filter(q => q.title === title);

      if (questionnaires.filter.length > 0)
        this.dataService.setQuestionnaire(questionnaires[0]);
    }

    if (this.questionnaire && this.questionnaire.questions.filter(q => q !== undefined && q.answered === undefined).length > 0)
      this.question = this.questionnaire.questions.filter(q => q.answered === undefined)[0];

    this.dataService.data.subscribe(questionnaires => {
      if (questionnaires.filter(q => q.title === title).length > 0) {
        this.questionnaire = questionnaires.filter(q => q.title === title)[0];
        if(this.question)
          this.question = this.questionnaire.questions.filter(q => q.title === this.question.title)[0];
        else 
          this.question = this.questionnaire.questions[0];
      }
    });
  }

  getQuestionsCount() : number {
    return (this.questionnaire ? this.questionnaire.questions.length : 0);
  }

  getQuestionsAnsweredCount(): number {
    if(this.questionnaire)
      return this.questionnaire.questions.filter(q => q.answered !== undefined).length;
    else
      return 0;
  }

  getProgressBarWidth(): number {
    return Math.round(100 * this.getQuestionsAnsweredCount() / this.getQuestionsCount());
  }

  chosenAnswer(answer: Answer): void {
    this.dataService.setAnswer(this.questionnaire, this.question, answer);
  }

  freeTextCompleted(text : string) : void {
    this.dataService.setAnswer(this.questionnaire, this.question, new Answer({text: text}));
  }

  back(): void {
    this.question.answered = undefined;
  }

  next(): void {
    if (this.questionnaire.questions.filter(q => q.answered === undefined).length > 0)
      this.question = this.questionnaire.questions.filter(q => q.answered === undefined)[0];
    else
      this.question = undefined;
  }

  no() : void {
    this.dataService.setAnswer(this.questionnaire, this.question, new Answer({text: this.question.answered.text, correct: false})).then(() => this.next());
  }

  yes() : void {
    this.dataService.setAnswer(this.questionnaire, this.question, new Answer({text: this.question.answered.text, correct: true})).then(() => this.next());
  }

  backToMenu(): void {
    this.router.navigate(['./']);
  }

  repeat(): void {
    this.questionnaire.questions.forEach(q => q.answered = undefined);
    this.dataService.setQuestionnaire(this.questionnaire);
  }
}
