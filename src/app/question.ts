import { Answer } from "./answer";

export class Question {
    title: string;
    text: string;
    type: string;
    answers: Answer[];
    answered: Answer;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}