import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionnaireListComponent } from './questionnaire-list/questionnaire-list.component';
import { QuestionnaireDetailComponent } from './questionnaire-detail/questionnaire-detail.component';

const routes: Routes = [
  { path: '', component: QuestionnaireListComponent },
  { path: 'questionnaire/:title', component: QuestionnaireDetailComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}