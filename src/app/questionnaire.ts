import { Question } from "./questions";

export class Questionnaire {
    title: string;
    questions: Question[];
    
    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}