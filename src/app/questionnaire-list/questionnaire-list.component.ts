import { Component, OnInit } from '@angular/core';
import { Questionnaire } from '../questionnaire';
import { Question } from '../question';
import { Answer } from '../answer';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-questionnaire-list',
  templateUrl: './questionnaire-list.component.html',
  styleUrls: ['./questionnaire-list.component.css']
})
export class QuestionnaireListComponent implements OnInit {

  questionnaires: Questionnaire[];

  constructor(private dataService: DataService,
    private router: Router) { }

  ngOnInit() {
    this.questionnaires = this.dataService.getQuestionnaires();

    this.dataService.data.subscribe(questionnaires => {
      this.questionnaires = questionnaires;
    });
  }

  getQuestionsAnsweredCount(questionnaire: Questionnaire) : number {
    return questionnaire.questions.filter(q => q.answered !== undefined).length;
  }

  getQuestionsUnansweredCount(questionnaire: Questionnaire) : number {
    return questionnaire.questions.filter(q => q.answered === undefined).length;
  }

  redirect(title: string): void {
    this.router.navigate(['./questionnaire', title]);
  }
}
