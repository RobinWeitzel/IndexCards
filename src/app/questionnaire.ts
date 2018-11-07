import { Question } from "./question";

export class Questionnaire {
    id: string;
    title: string;
    questions: Question[];
    
    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}